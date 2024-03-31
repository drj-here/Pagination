import { useEffect, useState } from "react";
import "./styles.css";
function App() {
 
  const [products,setProducts]=useState([])
  const [page,setPage]=useState(1)

  const fetchProducts=async()=>{
    const res=await fetch('https://dummyjson.com/products');
    const data=await res.json();
    if(data && data.products) setProducts(data.products)
    // console.log(data)
  }

  useEffect(()=>{
    fetchProducts()
  },[])

  const selectPageHandler=(selectedPage)=>{
    if(selectedPage>0 && selectedPage<=products.length/6 && selectedPage!==page)
        setPage(selectedPage)
  }

  return (
    <div className="App">
    
      {products.length && <div className="products">
        {
          products.slice((page-1)*6,page*6).map((product)=>{
            return (
             <span className="products__single" key={product.id}>
              <img src={product.thumbnail} alt={product.title}/>
              <span>{product.title}</span>
              </span>
            )
          })
        }
      </div>
    }
    {
      products.length && (
        <div className="pagination">
          <span className={page>1?"":"pagination__disable"} onClick={()=>selectPageHandler(page-1)}>◀️</span>
          {
            [...Array(products.length/6)].map((_,i)=>{// _ represents the current unused element and i represents the current index
              return <span className={page===i+1?"pagination__selected":""} onClick={()=>selectPageHandler(i+1)} key={i}>{i+1}</span>
            })
          }
          <span className={page<products.length/6?"":"pagination__disable"} onClick={()=>selectPageHandler(page+1)}>▶️</span>
        </div>
      )
    }
    </div>
  );
}

export default App;
