const AiUniversHub = () => {
  Spinners(true);
    fetch(`https://openapi.programming-hero.com/api/ai/tools`)
        .then(res => res.json())
        .then(data => {
            cardListHalf(data.data.tools.slice(0, 6))
        });
}
const cardListHalf = data => {
    const allCard = document.getElementById("all-card");

    if (data.length > 6) {
        const seeMore = document.getElementById("see-More");
        seeMore.classList.add('d-none');
    }
    allCard.innerHTML = "";
    data.forEach(element => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
                    <div class="card h-100 p-4">
                        <img src="${element.image}" class="card-img-top h-100" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">Features</h5>
                            <ol>
                            <li>${element.features[0]}</li>
                            <li>${element.features[1]}</li>
                            <li>${element.features[2]}</li>
                            </ol>
                        </div>
                        <hr>
 
                     <h4>${element.name}</h4>
                     <div class="d-flex justify-content-between">
                        <div class="d-flex mt-3">
                            <i class="fa-solid fa-calendar-day"></i>
                            <p class="mb-2 ps-2">${element.published_in}</p>
                        </div>
                        <i onclick="showModel('${element.id}')" class="fa-solid fa-arrow-right target" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
                    </div>

                    </div>`;
        allCard.appendChild(div);

    });
    Spinners(false);
}
const seeMore = () => {
  Spinners(true);
    fetch(`https://openapi.programming-hero.com/api/ai/tools`)
        .then(res => res.json())
        .then(data => cardListHalf(data.data.tools));
}

const showModel = (id) => {
    fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`)
        .then(res => res.json())
        .then(data => model(data));
}
const model = data => {
    // console.log(data.data.accuracy.score);
    const twoCard = document.getElementById("two-card");


    twoCard.innerHTML = `
    <div class="row">
  <div class="col-sm-6">
    <div class="card">
      <div class="card-body backGround" style="height: 450px">
        <h5 class="card-title my-3">${data.data.description}</h5>
        <div class="d-flex">
      
          <div class="p-2 back me-2 rounded-3" style="width: 110px;height: 100px;">${data.data.pricing[0].price ? data.data.pricing[0].price : "free of cost"}
           ${data.data.pricing[0].plan}</div>
           <div class="p-2 back me-2 rounded-2" style="width: 110px; height: 100px;">${data.data.pricing[1].price ? data.data.pricing[1].price : "free of cost"}
           ${data.data.pricing[1].plan}</div>
           <div class="p-2 col back me-1 rounded-2" style="width: 110px; height: 100px;">${data.data.pricing[2].price ? data.data.pricing[2].price : "free of cost"}
           ${data.data.pricing[2].plan}</div>
        </div>
        <div class="d-flex">
          <div>
             <h4  class="my-3">Features</h4>
             <ul>
               <li>${data.data.features[1].feature_name ? data.data.features[1].feature_name : 'not found'}</li>
               <li>${data.data.features[2].feature_name ? data.data.features[2].feature_name : 'not found'}</li>
               <li>${data.data.features[3].feature_name ? data.data.features[3].feature_name : 'not found'}</li>
                
             </ul>
          </div>
          <div>
             <h4 class="my-3">Integrations</h4>
             <ul>
                <li>${data.data.integrations[0] ? data.data.integrations[0] : "no data found"}</li>
                <li>${data.data.integrations[1] ? data.data.integrations[1] : "no data found"}</li>
                <li>${data.data.integrations[2] ? data.data.integrations[2] : "no data found"}</li>
             </ul>
          </div>
        
        </div>
        
      </div>
    </div>
  </div>
  <div class="col-sm-6">
  <div class="card">
  <div class="card-body" style="height: 450px">
     <div>
         <img class="img-fluid" src="${data.data.image_link[0]}" alt="">
         <h6 id="accuracyChecker" class="${checkAccurecy(data.data.accuracy.score)?'accuracy-possition' : 'hide'}">${checkAccurecy(data.data.accuracy.score)}</h6>
     </div>
     
    <h5 class="text-center inputdata my-3">${data.data.input_output_examples[0].input? data.data.input_output_examples[0].input : 'can you given example?'}</h5>
    <h5 class="text-center outputdata mb-5">${data.data.input_output_examples[1].output ? data.data.input_output_examples[1].output : "No! Not yet. take a break"}</h5>
    
  </div>
    </div>
  </div>
</div>
    
    `;


}

 document.getElementById("sort-Data").addEventListener("click", function(){
  Spinners(true);
  fetch(`https://openapi.programming-hero.com/api/ai/tools`)
  .then(res => res.json())
  .then(data => {
    shortByDate(data.data.tools)
  })
});
  const shortByDate =(date)=>
  {
    // console.log(date[0].published_in);
    // console.log(date);
    shortIng = (a,b) =>{
      const dataA = new Date(a.published_in);
      const datab = new Date(b.published_in);
      if(dataA>datab) return 1;
      
      else if(dataA<datab) return -1;
      return 0;

    }
    cardListHalf(date.sort(shortIng));

    
  //   date.forEach(element =>{
      
  //      console.log(element.published_in);
      
      
      


  // })
};
const Spinners = (isLoading) =>
{
  const spinner = document.getElementById("spinner-section");
  if(isLoading)
  {
    spinner.classList.remove("d-none");
  }
  else{
    spinner.classList.add("d-none");
  }

}
 const checkAccurecy = a =>
{
  console.log(a);
  
  if(a)
  {
     return `Accucry value: ${a}`;

  }
  else
  {
    return "";
  }
  
}

AiUniversHub()