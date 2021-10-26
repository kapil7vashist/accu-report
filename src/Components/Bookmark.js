import Sample from "../icons/news/sample-img.png";
import { useState } from "react";

const Bookmark = () => {
    let bookmarks = JSON.parse(localStorage.getItem("Bookmarks"));
    const [bookmarksAdd, changeBookmarks] = useState(bookmarks);
    // const bookmarks = null;
    function clearBookmarks() {
        changeBookmarks(null);
        localStorage.clear();
    }

    return (
        <div className="articles">
            <h4 style={{ textDecoration: "underline", fontSize: "26px" }}>Bookmarked Articles</h4>
            {
                (bookmarksAdd !== null && bookmarksAdd.length !== 0) ?
                    <button onClick={clearBookmarks} style={{ color: "white", backgroundColor: "black", fontSize: "18px", padding: "5px", margin: "10px 0px", cursor: "pointer" }}><i className="fas fa-trash"></i> Clear Bookmarks</button>
                    : null
            }
            <div className="articles-cards">
                {
                    (bookmarksAdd !== null && bookmarksAdd.length !== 0) ?
                        bookmarksAdd.map((article, index) => {
                            const { title, url, source, urlToImage, description } = article;
                            const { name } = source;

                            return (
                                <div key={index} className="news-card">
                                    <img src={urlToImage} alt="" />
                                    <p className="source">{name}</p>
                                    <h3 className="title-news">{title.substring(0, 100)}</h3>
                                    <p className="data-article">{description.substring(0, 100)}.....</p>
                                    <button id="read-more"><a href={url}><i className="fas fa-ellipsis-h"></i></a></button>
                                </div>
                            )
                        }) : <h4 style={{ color: "gray" }}>No Bookmarks Available</h4>
                }
            </div>
        </div>
    )
}

export default Bookmark;