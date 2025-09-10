import { Link } from "react-router-dom";
function Buttons({ styleType = "primary", text, className = "", onClick, linkTo }) {
    const base = "py-3 px-6 rounded-lg font-segoe font-semibold cursor-pointer border-2 outline transition duration-200 shadow-md hover:shadow-lg hover:scale-105";
    const styles = {
        primary: (extra = "") => `bg-lime-green text-mint-green-700 border-mint-green-600  hover:bg-lime-green/80 ${extra}`,
        secondary: (extra = "") => `bg-white text-mint-green-700 border-mint-green-600 hover:brightness-90 ${extra}`,
        tertiary: (extra = "") => `bg-mint-green-600 text-white  border-mint-green-600 outline-mint-green-600  hover:brightness-90 ${extra}`,
        quaternary: (extra = "") => `bg-olive-green-600 text-white  border-olive-green-600 outline-olive-green-600  hover:brightness-90 ${extra}`,
        quinary: (extra = "") => `bg-mustard-yellow-600 text-white  border-mustard-yellow-600 outline-mustard-yellow-600 hover:brightness-90 ${extra}`
    }

    if (linkTo) {
        return (
            <button className={`${base} ${styles[styleType](className)}`}>
                <Link to={linkTo}  >
                    {text}
                </Link>
            </button>
        );
    }
    return (
        <button className={`${base} ${styles[styleType](className)}`} onClick={onClick}>{text} </button>
    )
}
export default Buttons