import Headling from "../../Headling/Headling";
import Search from "../../components/Search/Search";
import styles from './Menu.module.css';
import {PREFIX} from "../../helpers/API";
import {Product} from "../../Interfaces/product.interface";
import {ChangeEvent, useEffect, useState} from "react";
import axios, {AxiosError} from "axios";
import {MenuList} from "./MenuList/MenuList";


export function Menu() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>();
    const [filter, setFilter] = useState<string>();


    useEffect(() => {
        getMenu(filter);
    }, [filter]);


    const getMenu = async (name?: string) => {
        try {
            setIsLoading(true);
            const {data} = await axios.get<Product[]>(`${PREFIX}/products`, {
                params: {
                    name
                }
            });
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

    const updateFilter = (e: ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value);
    };


    return (
        <>
            <div className={styles['head']}>
                <Headling>Меню</Headling>
                <Search onChange={updateFilter}
                        placeholder='Введите блюдо или состав' isValid={true}></Search>
            </div>
            <div>
                {error && <>{error}</>}
                {!isLoading && products.length > 0 && <MenuList products={products}/>}
                {isLoading && <>Загружаем продукты...</>}
                {!isLoading && products.length===0 && <>Блюда не найдены</>}
            </div>
        </>
    )
}

export default Menu;