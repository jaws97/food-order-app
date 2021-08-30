import mealsImage from '../../assets/meals.jpg'
import classes from './Header.module.css'
import HeaderCardButton from './HeaderCardButton'

function Header (props){
    return(
        <>
            <header className={classes.header}>
                <h1>React Meals</h1>
                <HeaderCardButton onClick={props.onShowCart} />
            </header>
            <div className={classes['main-image']}>
                <img src={mealsImage} alt="meals" />
            </div>
        </>
    );
}

export default Header