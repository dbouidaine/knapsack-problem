const max = (n,m)=>{
    return (n>m)?n:m;
}

const getValue=()=>{
    let val=[];
    $(".valeur").each(function() {
        val.push(parseInt($(this).text()));
    });
    return val;
}

const getWeight=()=>{
    let weight=[];
    $(".weight").each(function() {
        weight.push(parseInt($(this).text()));
    });
    return weight;
}

$("#obj").on('click', '.remove', function () {
    var rowCount = $('#obj tr').length;
    if (rowCount>1)
     {$(this).parents('tr').detach();}
   });
  


$("#form-btn").click(function(){
    event.preventDefault();
    let lastTd=$("#obj>tr:last-child>td").html();
    let id=parseInt(lastTd)+1;
    $("#obj").append(`
    <tr>
        <td>`+id+`</td>
        <td class="valeur" contenteditable="true">`+$("#value").val()+`</td>
        <td class="weight" contenteditable="true">`+$("#weight").val()+`</td>
        <td><a class="remove" href="#">remove</a></td>
    </tr>`
    );
});

function result(){
    let w=parseInt($("#poids").text());
    let res=knapsack(w);
    console.log(res);
    $("#result").empty();
    $("#result").append(`<h3>La valeur maximale obtenue est: `+res+`</h3>`);
}

const knapsack=(w)=>{
    let val=getValue();
    let weight=getWeight();
    let n=val.length;
    let k=[];
    for(let i=0;i<=n;i++){
        k.push([]);
        for(let j=0;j<=w;j++){
            if (i == 0 || j == 0) {
                k[i][j]=0;
            }
            else if (weight[i - 1] <= w){
                k[i][j]=max(val[i - 1] + k[i - 1][j - weight[i - 1]],k[i - 1][j]);
            }
            else{
                k[i][j] = k[i - 1][j]; 
            }
        }
    }
    return k[n][w];
}


/*const table=(n,value)=>{
    let k=[];
    for(let i=0;i<=n;i++){
        k.push([]);
        for(let j=0;j<=n;j++){
            k[i][j]=value;
            value+=1;
        }
    }
    return k;
}

let memory=new Map();
const max = (n,m)=>{
    return (n>m)?n:m;
}

const knapsack=(c,)=>{
    memory=new Map();
    
}

getTable(id){

}*/
