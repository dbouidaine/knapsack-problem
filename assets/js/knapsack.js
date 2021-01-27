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
    $("#obj>tr>td").css("background-color","none");
    $("#obj>tr>td").removeClass("selected");
    let w=parseInt($("#poids").text());
    let res=knapsack(w);
    console.log(res);
    $("#result").empty();
    $("#result").append(`<h3>La valeur maximale obtenue est: `+res+`</h3>`);
    for(let element of trace){
        let selector=`#obj>tr:nth-child(`+element[0]+`)>td`;
        $(selector).addClass("selected");
    }
}
let trace=[];
const knapsack=(w)=>{
    trace=[];
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
    
    let res=[];
    res.push(k[n][w]);
    let r=res[0];
    let wt=w;
    for (let i = n; i > 0 && r > 0; i--) { 
        if (r == k[i - 1][wt]) 
        continue;
        else { 
            trace.push([i,weight[i - 1],val[i-1]]); 
            r = r - val[i - 1]; 
            wt = wt - weight[i - 1]; 
        }
    }
    console.log(trace);
    return k[n][w];
}
