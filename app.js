let Buttons= document.querySelectorAll('.controls');
let LoadingOpponent= document.querySelector('.loadingComputer');
let ButtonRefresh= document.querySelector('.RefreshButton');
let ComputerChoose='';
let PlayerChoose='';
const MouseMoveAnimationAdd=(ind)=>{
    Buttons.forEach((item, index) =>{ index!=ind?item.classList.add('inactiveBG'):''})
    Buttons[ind].classList.add('active');
    if(ind==0){
        Buttons[ind+1].classList.add('HalfEctive');
    }
    if(ind==1){
        Buttons[ind+1].classList.add('HalfEctive');
        Buttons[ind-1].classList.add('HalfEctive');
    }
    if(ind==2){
        Buttons[ind-1].classList.add('HalfEctive');
    }

}
const MouseMoveAnimationRemove=(ind)=>{
    Buttons.forEach(item =>{
        item.classList.remove('inactiveBG');
        item.classList.remove('HalfEctive');
        item.classList.remove('active');
    })
}
const ShowComputeDecision=(ind)=>{
    const images= ['scissors', 'paper', 'rock'];
    let OpponentImage= document.querySelector('.OpponentImage');
    let OpponentSide= document.querySelector('.OpponentImageWrapper');
    OpponentSide.classList.add('OpponentActive');
    OpponentImage.setAttribute('src', `Images/${images[ind]}.png`);
    LoadingOpponent.style.display='none';
    ComputerChoose= images[ind];
    setTimeout(SetDefaultAll, 1000)
    

}
const ComputerDecision=()=>{
    let value= Number(Math.random().toFixed(2));
    
    if(value>=0 &&value<=0.33 ){
        
        value=0;
        ShowComputeDecision(value);
        return;
    }
    if(value>=0.34 &&value<=0.67 ){
       
        value=1;
        ShowComputeDecision(value);
        return;
    }
    if(value>=0.68 && value<=1 ){
        
        value=2;
        ShowComputeDecision(value);
        return;
    }
}
const DisplayPlayerGameArea=(event)=>{
    Buttons.forEach(item=>{
        item.classList.add('inactiveImg');
    })
    let PlayerSide= document.querySelector('.PlayerImageWrapper');
    let item = event.target.getAttribute('data-item');
    let PlayerImage= document.querySelector('.PlayerImage');
    PlayerSide.classList.add('PlayerActive');
    LoadingOpponent.style.display='flex';
    if (item==='scissors'){
        PlayerImage.setAttribute('src', 'Images/scissors.png');
        
    }
    if(item=== 'rock'){
        PlayerImage.setAttribute('src', 'Images/rock.png');
        
    }
    if(item=== 'paper'){
        PlayerImage.setAttribute('src', 'Images/paper.png');
    }
    setTimeout(ComputerDecision, 1000);
    PlayerChoose=item;
}
const SetDefaultAll=()=>{
    let PlayerSide= document.querySelector('.PlayerImageWrapper');
    PlayerSide.classList.remove('PlayerActive');
    let OpponentSide= document.querySelector('.OpponentImageWrapper');
    OpponentSide.classList.remove('OpponentActive');
    Buttons.forEach(item=>{
        item.classList.remove('inactiveImg');
    })
    Score();
}
const ScoreRefresh=()=>{
    let OpponentField= document.querySelector('.opponentScore');
    let PlayerField= document.querySelector('.playerScore');
    OpponentField.textContent=0;
    PlayerField.textContent=0;

}
const Score=()=>{
    const AddToPlayer=()=>{
        PlayerScore +=1;
    }
    const AddToOponent= ()=>{
        OpponentScore +=1;
    }
    let OpponentField= document.querySelector('.opponentScore');
    let PlayerField= document.querySelector('.playerScore');
    let OpponentScore= Number(OpponentField.innerHTML);
    let PlayerScore= Number(PlayerField.innerHTML);
  

    if(PlayerChoose=='paper'){
        if(ComputerChoose== 'rock')AddToPlayer();
        if(ComputerChoose=='paper')return;
        if(ComputerChoose=='scissors')AddToOponent();
    }
    if(PlayerChoose=='scissors'){
        if(ComputerChoose=='rock')AddToOponent()
        if(ComputerChoose=='paper')AddToPlayer()
        if(ComputerChoose=='scissors')return
    }
    if(PlayerChoose=='rock'){
        if(ComputerChoose=='paper') AddToOponent()
        if(ComputerChoose=='scissors') AddToPlayer();
        if(ComputerChoose=='rock') return
    }

    OpponentField.textContent= OpponentScore;
    PlayerField.textContent= PlayerScore;
}

ButtonRefresh.addEventListener('click', ScoreRefresh);
Buttons.forEach((item,index)=>{
    item.addEventListener('mouseenter',()=>{ MouseMoveAnimationAdd(index)} )
    item.addEventListener('mouseleave',()=>{ MouseMoveAnimationRemove(index)} )
    item.addEventListener('click', DisplayPlayerGameArea)
})