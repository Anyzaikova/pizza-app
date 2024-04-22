import Headling from "../../Headling/Headling";
import Search from "../../components/Search/Search";
import styles from './Menu.module.css';
import {PREFIX} from "../../helpers/API";
import {Product} from "../../Interfaces/product.interface";
import {useEffect, useState} from "react";
import axios, {AxiosError} from "axios";
import {MenuList} from "./MenuList/MenuList";


export function Menu() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>();


    const getMenu = async () => {
        // try {
        //     const res = await fetch(`${PREFIX}/products`);
        //     if (!res.ok) {
        //         return;
        //     }
        //     const data = await res.json() as Product[];
        //     setProducts(data);
        // } catch (err) {
        //     console.error(err)
        //     return ;
        // }


        //АНАЛОГ С ПОМОЩЬЮ axios

        try {
            setIsLoading(true);
            const {data} = await axios.get<Product[]>(`${PREFIX}/products`);
            setProducts(data);
            setIsLoading(false);
        } catch (e) {
            console.error(e);
            setIsLoading(false);
            if (e instanceof AxiosError) {
                setError(e.message);
            }
            setIsLoading(false);
            return;
        }
    };
    useEffect(() => {
        getMenu();
    }, [])
    return (
        <>
            <div className={styles['head']}>
                <Headling>Меню</Headling>
                <Search placeholder='Введите блюдо или состав' isValid={true}></Search>
            </div>
            <div>
                {error && <>{error}</>}
                {!isLoading && <MenuList products={products}/>}
                {isLoading && <>Загружаем продукты...</>}
            </div>
        </>
    )
}

export default Menu;