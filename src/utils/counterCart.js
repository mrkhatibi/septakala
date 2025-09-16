


const sumProducts = (products) => {
    const itemsCounter = products.reduce((acc , cur)=>{
       return  acc + cur.quantity
    } , 0)

    const total = products.reduce((acc , cur)=> {
       return  acc + cur.price*cur.quantity
    } , 0)
    return {itemsCounter , total}
}


export {sumProducts}