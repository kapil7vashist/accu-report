
import NewsSpinner from "../NewsSpinner";
// import Spinner from "../Spinner.js";
const Articles = ({ data, loading }) => {
    // console.log(data);
    if (localStorage.getItem("Bookmarks") === null) {
        localStorage.setItem("Bookmarks", JSON.stringify([]))
    };

    return (
        <div className="articles">

            {loading ? <NewsSpinner /> : data.length === 0 ? <> <h1>Oops ! We Cannot Find Anything, Sorry.</h1></> : <>
                <h4>Articles from <a href="https://newsapi.org/" target="_blank" id="sp-link">News API</a></h4>
                {/* <h2 style={{ backgroundColor: "lightgreen", margin: "10px 0px", textAlign: "center", borderRadius: "10px", padding: "5px 5px" }} className="added hide">Added To Bookmarks</h2> */}

                <div className="articles-cards">
                    {
                        data.map((article, index) => {
                            const { title, url, source, urlToImage, description } = article;
                            const { name } = source;
                            function addBookmark(e) {
                                if (localStorage.getItem("Bookmarks") === null) {
                                    localStorage.setItem("Bookmarks", JSON.stringify([]))
                                    let bookmarkedArticles = JSON.parse(localStorage.getItem("Bookmarks"));
                                    bookmarkedArticles.push(article);
                                    localStorage.setItem("Bookmarks", JSON.stringify(bookmarkedArticles));
                                } else {
                                    let bookmarkedArticles = JSON.parse(localStorage.getItem("Bookmarks"));
                                    bookmarkedArticles.push(article);
                                    localStorage.setItem("Bookmarks", JSON.stringify(bookmarkedArticles));
                                }

                                // const bookmarked = document.querySelector(".added");
                                // bookmarked.classList.remove("hide");

                                // setTimeout(() => {
                                //     bookmarked.classList.add("hide");
                                // }, 3000);

                                const btn = (e.target.nodeName);

                                if (btn === "I") {
                                    // console.log(e.target.previousElementSibling);
                                    e.target.previousElementSibling.classList.remove("hide");
                                    e.target.classList.remove("fa-plus");
                                    e.target.classList.add("fa-check-circle");
                                    setTimeout(() => {
                                        e.target.previousElementSibling.classList.add("hide");
                                    }, 2000);

                                } else {
                                    // console.log(e.target.firstChild)
                                    e.target.firstChild.classList.remove("hide");
                                    e.target.firstChild.nextElementSibling.classList.remove("fa-plus");
                                    e.target.firstChild.nextElementSibling.classList.add("fa-check-circle");
                                    setTimeout(() => {
                                        e.target.firstChild.classList.add("hide");
                                    }, 2000);
                                }
                            }

                            if (title !== null && url !== null && source !== null && urlToImage !== null && description !== null) {
                                return (
                                    <>
                                        <div key={index} className="news-card">
                                            <button id="bookmark" onClick={e => addBookmark(e)}><span className="span-add hide" style={{ fontWeight: "bold" }}>Added</span> <i className="fas fa-plus"></i></button>
                                            <img src={urlToImage} alt="" />
                                            <p className="source">{name}</p>
                                            <h3 className="title-news">{title.substring(0, 100)}</h3>
                                            <p className="data-article">{description.substring(0, 100)}....</p>
                                            <button id="read-more"><a href={url} target="_blank" style={{ color: "black" }}><i className="fas fa-ellipsis-h"></i> Read More</a></button>
                                        </div>
                                    </>
                                )
                            }
                        })
                    }
                </div>
            </>}
        </div>
    )
};

export default Articles;




