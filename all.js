const height = document.getElementById("userHeight");
const weight = document.getElementById("userWeight");
const sendBtn = document.getElementById("sendData");
const data = JSON.parse(localStorage.getItem("userData")) || [];
const renderList = document.getElementById('renderList');
// 送出鍵
const renderBtn = document.getElementById("renderBtn")
console.log(data);
// 渲染到畫面上
renderData(data);

function getData(e) {
    e.preventDefault();
    const userHeight = parseFloat(height.value);
    const userWeight = parseFloat(weight.value);
    // 計算bmi
    const bmi = userWeight / (userHeight / 100) ** 2;
    console.log(bmi);
    // 產生物件
    const userData = {
        height: userHeight,
        weight: userWeight,
        bmi: bmi
    }
    data.push(userData);
    // 把bmi放在localstorage
    localStorage.setItem("userData", JSON.stringify(data));
    renderData(data);
    changeBtn();
}
// 當按下按鈕
sendBtn.addEventListener('click', getData);

// 顯示到畫面上
function renderData(item) {
    renderList.innerHTML = "";
    for (let i = 0; i < item.length; i++) {
        const bmi = item[i].bmi;

        if (bmi >= 18.5 && bmi <= 25) {
            status = "理想";
            color = "success";
        } else if (bmi >= 25 && bmi <= 35) {
            status = "輕度肥胖";
            color = "warning";
        } else if (bmi > 35) {
            status = "重度肥胖"
            color = "danger"
        } else {
            status = "過輕";
            color = "primary"
        }
        str = ` <div class="col-8 mt-3">
       <div class="alret alert-${color} py-3 d-flex justify-content-around">
           <span>${status}</span>
           <span>
               <small>bmi</small>
               ${item[i].bmi}
           </span>
           <span>
               <small>weight</small>
               ${item[i].weight} <small>kg</small>
           </span>
           <span>
               <small>height</small>
               ${item[i].height}
               <small>cm</small>
           </span>
       </div>
   </div>`
        renderList.innerHTML += str;
        // 送出鍵轉換成使用者的bmi


    }

}
function changeBtn() {
    const userHeight = parseFloat(height.value);
    const userWeight = parseFloat(weight.value);
    // 計算bmi
    const bmi = Math.round((userWeight / (userHeight / 100) ** 2) * 100) / 100;
    const userData = {
        height: userHeight,
        weight: userWeight,
        bmi: bmi
    }
    if (bmi >= 18.5 && bmi <= 25) {
        status = "理想";
        color = "success";
    } else if (bmi >= 25 && bmi <= 35) {
        status = "輕度肥胖";
        color = "warning";
    } else if (bmi > 35) {
        status = "重度肥胖"
        color = "danger"
    } else {
        status = "過輕";
        color = "primary"
    }
    renderBtn.innerHTML = `<div class="d-flex">
    <div class="text-${color} circle-${color} d-flex align-items-center justify-content-center">
    <div>
        <h5 class="mb-0">${userData.bmi}</h5>
      <div class="d-flex justify-content-center">
         <small class="text-center">BMI</small>
      </div>
     
    </div>
  
  </div>
    <h3 class="align-self-center text-${color}">${status}</h3>
  </div>`
}
