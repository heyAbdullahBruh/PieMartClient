// Slider.js
'use client'
import { useEffect, useState } from 'react';
import styles from './shop.module.css';
import SRange from './sliderRange/Range';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { api } from '@/config/api';
import ProductTemp from '../product/ProductTemp/ProductTemp';


const Shopping = ({endP}) => {

    const [products,setProducts]=useState([]);
    const [error,setError]=useState('');

    const [loadding,setLoadding]=useState(true);

    const [pricerange, setPriceRange] = useState([10, 10000]);
    const getDataFromSRange = (data) => {
        setPriceRange(data);
    };

    const [priceF,setPriceF]=useState(false);

    const [ratF,setRatF]=useState(false);

    const [brandF,setBrandF]=useState(false);

    const [rating, setRating] = useState([1,5]);

    const [brand,setBrand]=useState('');

    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionChange = (event) => {
      setSelectedOption(event.target.id);
    };

    const handleBrand= (e)=>{
        setBrand(e.target.value)
    };

    useEffect(()=>{
       fetch(`${api}/product/${pricerange[0]}/${pricerange[1]}/${rating[0]}/${rating[1]}/?brand=${brand}`)
        .then(res=>res.json())
        .then((res)=>{
            if(res.success===true){
                setProducts(res.products);
                setError('');
                setLoadding(false);
            }else{
                setError(res.message);
                setProducts([]);
                setLoadding(false);
            }
        }).catch((err)=>setError(err.message));

    },[pricerange,rating,brand])


    // console.log(brand);
// console.log(rating);

    

// console.log(pricerange&&pricerange[0],pricerange&&pricerange[1]);

   return(
    <section className={styles.shopping}>
         <div className={styles.filter}>
            <div className={styles.pF}>
              <label htmlFor="priceFilter">
                <p> <input type="checkbox" onChange={()=>setPriceF(!priceF)} className={styles.checkbox} /> Filtering price :- </p>
              </label>
              {
                priceF&&<SRange sendData={getDataFromSRange}/>
              }
            </div><hr />

            <div className={styles.ratF}>
                <label htmlFor="rateFilter">
                    <p> <input type="checkbox" onChange={()=>setRatF(!ratF)} className={styles.checkbox} /> Filtering Rating :- </p>
                </label>
               {
                ratF&& 
                  <div className={styles.radio2}>
                        <input
                            name="radio2-group"
                            id="radio2-input1"
                            type="radio"
                            checked={selectedOption === 'radio2-input1'}
                            onChange={handleOptionChange}
                            onClick={()=> setRating([4,5])}
                        />
                        <label htmlFor="radio2-input1">
                            <span></span>
                        4<FontAwesomeIcon icon={faStar}/> - 5<FontAwesomeIcon icon={faStar}/>
                        </label>
                        <div className={styles.radioButton}>
                            <input name="radio2-group" id="radio2-input2" type="radio" checked={selectedOption === 'radio2-input2'} onChange={handleOptionChange}
                            onClick={()=> setRating([3,4])} />
                            <label htmlFor="radio2-input2">
                            <span></span>
                            3<FontAwesomeIcon icon={faStar}/> - 4<FontAwesomeIcon icon={faStar}/>
                            </label>
                        </div>
                        <div className={styles.radioButton}>
                            <input
                            name="radio2-group"
                            id="radio2-input3"
                            type="radio"
                            checked={selectedOption === 'radio2-input3'}
                            onChange={handleOptionChange}
                            onClick={()=> setRating([1,3])}
                            />
                            <label htmlFor="radio2-input3">
                            <span></span>
                            1<FontAwesomeIcon icon={faStar}/> - 3<FontAwesomeIcon icon={faStar}/>
                            </label>
                        </div>
                  </div>
                }
            </div><hr />

            <div className={styles.brandF}>
            <label htmlFor="priceFilter">
                <p> <input type="checkbox" onChange={()=>setBrandF(!brandF)} className={styles.checkbox} /> Filtering Brand :- </p>
              </label>
               {
                brandF&&
                <select name="brand" onChange={handleBrand}>
                    <option value="apple">Apple</option>
                    <option value="oppo">Oppo</option>
                    <option value="lorial">Lorial</option>
                    <option value="export">Export</option>
                    <option value="crystal">crystal</option>
                    <option value="vivo">Vivo</option>
                </select>
               }
            </div><hr />
       </div>

       <div className={styles.prodItems}>
            {
                loadding?'Loadding':
                <>
                    <div className={styles.shopProds}>
                        {products?.slice(0,endP).map(p => (
                            <ProductTemp key={p._id} product={p} />
                        ))}
                    </div>
                    {
                        error&&<h1 style={{color:'red',textAlign:'center'}}>{error}</h1>
                    }
                </>
            }
       </div>
    </section>
   );
};

export default Shopping;
