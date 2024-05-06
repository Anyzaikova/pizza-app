import {useParams, useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {PREFIX} from "../../helpers/API";
import Headling from "../../components/Headling/Headling";
import Button from "../../components/Button/Button";
import styles from './Product.module.css';
import {cartActions} from "../../store/cart.slice";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../store/store";


function Product() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const dispatch = useDispatch<AppDispatch>();

    const add = (e: MouseEvent) => {
        e.preventDefault();
        dispatch(cartActions.add(product.id));
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${PREFIX}/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
    }


    return (
        <div className={styles['product']}>
            <div className={styles['heading']}>
                <button onClick={() => navigate('/')} className={styles['arrow']}>
                    <img src='/arrow.svg' alt='Значок стрелки/возвращение назад'/>
                </button>
                <Headling>{product.name}</Headling>
                <Button appearance='small' className={styles['btn']}
                        onClick={add}>
                    <img src='/cart-button-icon.svg'/>
                    В корзину</Button>
            </div>
            <div className={styles['card']}>
                <div className={styles['card-image']} style={{backgroundImage: `url('${product.image}')`}}>
                </div>
                <div>
                    <div className={styles['price']}>
                        <div className={styles['text']}>Цена </div>
                        <div className={styles['num']}>{product.price} <span>₽</span></div>
                    </div>
                    <hr className={styles['hr']}/>
                    <div className={styles['rating']}>
                        <div className={styles['text']}>Рейтинг </div>
                        <div className={styles['rate']}>
                            <div>
                                {product.rating}&nbsp;
                                <img src='/star-icon.svg' alt='Иконка звезды-рейтинг'/>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={styles['structure']}>Cостав
                        </div>
                        <div className={styles['ingredients']}>{product.ingredients.map((ing,index)=>
                            <li key={index}>
                                {ing}
                            </li>)}</div>
                    </div>
                </div>
                </div>

        </div>
    );
}

export default Product;
