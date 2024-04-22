
import {ProductCardProps} from "./ProductCard.props";
import styles from './ProductCard.module.css';
import {Link} from "react-router-dom";

function ProductCard(props: ProductCardProps)  {
    return (
        <Link to={`/product/${props.id}`} className={styles['link']}>
            <div className={styles['card']}>
                <div className={styles['head']} style={{backgroundImage:`url('${props.image}')`}}>
                    <div className={styles['price']}>
                        {props.price}&nbsp;
                        <span className={styles['currency']}>₽</span>
                    </div>
                    <button className={styles['add-to-cart']}>
                        <img src='/cart-button-icon.svg' alt='Добавить в корзину'/>
                    </button>
                    <div className={styles['rating']}>
                        {props.rating}&nbsp;
                        <img src='/star-icon.svg' alt='Иконка звезды-рейтинг'/>
                    </div>
                </div>
                <div className={styles['footer']}>
                    <div className={styles['name']}>
                        {props.name}
                    </div>
                    <div className={styles['ingredients']}>
                        {props.ingredients}
                    </div>
                </div>
            </div>
        </Link>

        )
                }
                export default ProductCard;


