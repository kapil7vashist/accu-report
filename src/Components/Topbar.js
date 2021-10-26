import { useState } from "react";
import { Consumer } from "../Context.js";
import Articles from "./Articles.js";
import Bookmark from "./Bookmark.js";


const Topbar = () => {
    const [bookmarks, changeBookmark] = useState(false);
    const [loading, changeLoading] = useState(false);
    return (
        <Consumer>{
            value => {
                const { articles, changeArticles } = value;

                function searchNews() {
                    const inputSearch = document.getElementById("news-input");
                    const newsTopic = inputSearch.value;
                    inputSearch.value = "";

                    fetch(`https://newsapi.org/v2/everything?q=${newsTopic}&apiKey=f05371edb53247e18848957fc4d8dbdd`).then(res => res.json()).then(data => {
                        changeArticles([]);
                        changeLoading(true);
                        setTimeout(() => {
                            changeArticles(data.articles);
                            changeLoading(false);
                        }, 1000)
                    }).catch(err => console.log(err));
                }


                return (
                    <>
                        <div className="news-top">
                            <button className="bookmarks" onClick={() => changeBookmark(!bookmarks)}>{!bookmarks ? <i className="fas fa-bookmark"></i> : <i className="far fa-newspaper"></i>}{!bookmarks ? "Bookmarks" : "Live"}</button>
                            {
                                !bookmarks ?
                                    <div className="search-news">
                                        <input id="news-input" type="text" placeholder="Search News" />
                                        <button id="search-news" onClick={searchNews}><i className="fas fa-search"></i></button>
                                    </div> : null
                            }
                        </div>
                        {bookmarks ? <Bookmark /> : <Articles data={articles} loading={loading} />}
                    </>
                )
            }
        }
        </Consumer>
    )
};

export default Topbar;

