const btnContainer=document.getElementById("btn-container");
const cardContainer=document.getElementById("card-container");
const errorElement=document.getElementById("error-element");
const sortBtn=document.getElementById("sort-btn");
let selectedCategory=1000;
let sorted=false;
sortBtn.addEventListener("click",()=>{
    sorted=true;
    fetcDataByCatagorier(selectedCategory,sorted)
})

const fetchCatagories=()=>{
  const url='https://openapi.programming-hero.com/api/videos/categories';
  fetch(url)
  .then((res)=>res.json())
  .then(({data})=>{
    data.forEach(card => {
        // console.log(card);
        const newbtn=document.createElement("button");
        newbtn.innerText=card.category;
        
        newbtn.addEventListener("click",()=>{
            fetcDataByCatagorier(card.category_id);
          const allbutton=document.querySelectorAll(".category-btn");
          for (const btn of allbutton) {
            console.log(btn);
            btn.classList.remove("bg-red-600")
          }
          newbtn.classList.add("bg-red-600")

        });
        btnContainer.appendChild(newbtn);
        newbtn.className="btn category-btn btn-ghost bg-slate-700 text-white text-lg";
        
        
       
    });
  });
 
}
const fetcDataByCatagorier=(categoryId,shortByView)=>{
    
    selectedCategory=categoryId;
    cardContainer.innerHTML=""
    const url=`https://openapi.programming-hero.com/api/videos/category/${categoryId}`;
    fetch(url)
    .then((res)=>res.json())
    .then(({data})=>{ 
        // console.log(data);
        if (shortByView) {
         data.sort((a,b)=>{
            const totalVeiwStrFirst=a.others?.views;
            const totalVeiwStrSecond=b.others?.views;
            const firstVewiNumber=parseFloat(totalVeiwStrFirst.replace("k","")) ||0;
            const secondVewiNumber=parseFloat(totalVeiwStrSecond.replace("k","")) ||0;
          return secondVewiNumber-firstVewiNumber;
         })
        }
        // console.log(data);
        if (data.length===0) {
            errorElement.classList.remove('hidden');
        }
        else{
            errorElement.classList.add('hidden');
        }
        data.forEach(vedio => {
            console.log(vedio);
            let verifiedBatch='';
            if (vedio.authors[0].verified) {
                verifiedBatch=`<img class="w-6 h-6" src="./images/verify.png" alt="">`
            }
            const newCard = document.createElement("div");
            console.log(vedio.authors[0].verified);
            newCard.innerHTML=`
            <div class="card w-full bg-base-100 shadow-xl">
            <figure class="overflow-hidden h-72">
                <img class="w-full" src="${vedio.thumbnail}" alt="Shoes" />
                <h6 class="absolute text-2xl text-rose-400 bottom-[40%] right-12">${timeConverter(vedio.others.posted_date)}</h6>
            </figure>
            <div class="card-body">
                <div class="flex space-x-4 justify-start items-start">
                    <div>
                        <img class="w-12 h-12 rounded-full" src="${vedio.authors[0].profile_picture}" />
                    </div>
                    <div>
                        <h2 class="card-title">${vedio.title}</h2>
                        <div class="flex mt-3">
                            <p class="">${vedio.authors[0].profile_name}</p>
                           ${verifiedBatch}
                        </div>
                        <p class="mt-3">${vedio.others.views}</p>
                    </div>
                </div>
            </div>
        </div>
            `;
           
         cardContainer.appendChild(newCard);
        
        });
        

    })
}
const timeConverter=(num)=>{
    let hours=Math.floor(num/60);
    let miniute=num%60;
    return `${hours} hours : ${miniute} miniute `;
}
fetchCatagories()
fetcDataByCatagorier(selectedCategory,sorted)