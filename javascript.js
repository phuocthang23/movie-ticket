const content = document.querySelector(".content")
const row = 10;
const rowName = {
    1:'A',
    2: 'B',
    3: 'C',
    4: 'D',
    5 : 'E',
    6: 'F',
    7 :'G',
    8 : 'H',
    9 : 'I',
    10: 'K',
}
//add class vip
// ES5, ES6 ....
const vipClass = (i)=>{
    if(i === 8 ){
        return 'vip top'
    }
    else if(i === 9 ){
        return 'vip'
    }
    else if(i === 10 ){
        return 'vip'
    }
    else{
        return ''
    }
};

//format number
const formatNumber = (number)=>{
    /// 100.000
    /// = 100.000 đ

    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number)
}


const movieList = [
    {
    id: 1,
    animation:'2D',
    name: 'Avengers', 
    time: '12:00',
    price: 100000,
    theater:'CGV Vincom',
    vipprice:50000,
    room: 'A1',
    image: 'https://upload.wikimedia.org/wikipedia/vi/2/2d/Avengers_Endgame_bia_teaser.jpg'
}
]
let html = '' ; // temp
//handle html Column 
const htmlCol = (j,i)=>{
    return `<span class="chair ${vipClass(i)}">${rowName[i]}${j}</span>`
}

//create table cinemax
const col= 10;
    for(let i = 1;i<=row ;i++){
        for(let j = 1 ;j<= col;j++ ){
            html += htmlCol(j,i)
        }  
        html+= `<br>`
    }

//render
content.innerHTML = html

const chailList = []
var gia_arr = [];

//render about
const renderAbout = (movie,vip)=>{
    // const total = vip === true ? movie.price + movie.vipprice : movie.price
    console.log(gia_arr)
    var total = gia_arr.reduce(function (acc, obj) { return acc + obj.gia; }, 0);
    
    console.log(gia_arr.length - 1);
    var ob = gia_arr[gia_arr.length - 1];
    console.log(total)
    console.log(ob.gia)
     return `
            <div class="about_img">
            <img src="${movie.image}" alt="" />
            <h3>${movie.name}</h3>
            <h3>${movie.animation}</h3>
        </div>
        <div class="thongtin">
            <div class="rap">
            <p>Rạp: </p>
            <span>${movie.theater}</span>
            </div>
            <div class="suat">
            <p>Suất chiếu: </p>
            <span>${movie.time}</span>
            </div>
            <div class="phong">
            <p>Phòng: </p>
            <span>${movie.room}</span>
            </div>
            <div class="ghe">
            <p>Ghế: </p>
            <span>${chailList.map((chair)=>{return `${chair}
            `;})}</span>
        </div>
        <div class="thanhtoan">
            <div class="gia">
            <p>Giá vé: </p> 
            <span>${formatNumber(ob.gia)}</span>
            </div>
            <div class="tong">
            <p>Tổng</p>
            <span>${ formatNumber(total)}</span>
            </span>
        </div>
        <div class="button">
            <button onclick="handleButton()" id="btn_submit" class="btn btn-primary"> Đặt vé </button>
        </div>
    `
}


//index
let indexTemp = [];
//handle click column
const chairList = [... document.querySelectorAll('.chair')]
// const chairList = document.querySelectorAll('.chair');
// DOM - Object 
// console.log(chairList);
console.log("indexTemp = "+indexTemp);
chairList.forEach((chair,index)=>{
    chair.onclick = (e)=>{
        // console.log(chairList.length);
        //toggle class
        chair.classList.toggle('check') // công tắc đèn. insert check, nếu có class check => remove check

        if(!indexTemp.some((x) => x === index)){
            // console.log("x = "+x);
            console.log("index = "+index);
            console.log("true")
            indexTemp.push(index)
        }else{
            console.log("false")
            indexTemp.splice(indexTemp.indexOf(index),1)
        }
        // kiểm tra vip để gán số tiền vô arr
        if(gia_arr.some((x) => x.index === index)) {
            gia_arr.splice(indexTemp.indexOf(index),1)
        }else {
            let vip_tmp = chair.classList.contains('vip')
            console.log(vip_tmp);
            if(vip_tmp) {
                let gia = {
                    index: index,
                    gia: movieList[0].price + movieList[0].vipprice
                }
                gia_arr.push(gia)
            } else {
                let gia = {
                    index: index,
                    gia: movieList[0].price
                }
                gia_arr.push(gia)
            }
        }
        console.log(gia_arr)

        var vip = chair.classList.contains('vip')
        console.log(vip);
        if(chair.classList.contains('remove')){ // trả về true => nếu có, false nếu ko có
            alert("Ghế đã được đặt");
            return null;
        }
        //add chair to chairList
        if(chair.classList.contains('check')){
                chailList.push(chair.textContent)
        }else{
            chailList.splice(chailList.indexOf(chair.textContent),1)
        }
        console.log(chailList)
        //get class vip
        var vip = chair.classList.contains('vip')
        //render about
        if(chailList.length > 0){
            const about = document.querySelector(".about")
            about.innerHTML = renderAbout(movieList[0],vip)
        }else{
            const about = document.querySelector(".about")
            about.innerHTML = ''
        }
    }
})


const handleButton = (event) => {
    console.log(indexTemp)
    console.log(chailList)
    indexTemp.forEach(index => {
    chairList[index].classList.remove('check')
    chairList[index].classList.add('remove')
    chailList.splice(chailList[index],1)
    const about = document.querySelector(".about")
    about.innerHTML = ''
    
    })
    alert('Đặt vé thành công');
}