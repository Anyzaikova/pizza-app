import {useLoaderData, Await} from "react-router-dom";
import {Suspense} from 'react';
import type {Product} from "../../Interfaces/product.interface";

function Product() {
    const data = useLoaderData() as { data: Product };

    return (
        <Suspense fallback={'Загружаю...'}>
            <Await
                resolve={data.data}
            >
                {({data}: { data: Product }) => {
                    return  (
                        <>product - {data.name}</>
                        )
                }}
            </Await>
        </Suspense>

    )
}

export default Product;