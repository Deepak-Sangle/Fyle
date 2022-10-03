import "../styles/not-found.css"

const NotFound = () => {
    return (
        <div className="notFoundDiv">
            <h3 className="userNotFoundText">User not found</h3>
            <img
                alt=""
                src="/404.png"
                className="notFoundImg"
            />
        </div>
    );
}
 
export default NotFound;