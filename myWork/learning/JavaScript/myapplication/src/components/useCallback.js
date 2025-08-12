import {useCallback} from 'react';

function ProductPage({productId, referrer, theme}){
    //const handleSubmit = useCallback(orderDetails)=> {
        postMessage('/product/'+ productId + '/buy', {
            referrer,
            orderDetails,
        });
    } [productId,referrer];
//}