// Create WebSocket connection.
const socket = new WebSocket("ws://localhost:3000");

// Connection opened
socket.addEventListener("open", (event) => {
    console.log('Connected to websocket')
});

// Listen for messages
socket.addEventListener("message", (event) => {
    console.log("Message from server");

    let data = JSON.parse(event.data);
    console.log(data);
    
    if(data.status){
        let result = data.result
        console.log(result);
        
        $('#content').html(`       
            <div class="card">
                <div class="card-body p-3">
                    <div class="row">
                        <div class="col-8">
                            <div class="numbers">

                                <h5 class="font-weight-bolder mb-0">
                                    Ticker: ${result.ticker}
                                </h5>

                                <p class="text-sm mb-0 text-capitalize font-weight-bold">date: ${result.date.split('T')[0]}</p>
                                <p class="text-sm mb-0 text-capitalize font-weight-bold">close: ${result.close}</p>
                                <p class="text-sm mb-0 text-capitalize font-weight-bold">high: ${result.high}</p>
                                <p class="text-sm mb-0 text-capitalize font-weight-bold">low: ${result.low}</p>
                                <p class="text-sm mb-0 text-capitalize font-weight-bold">open: ${result.open}</p>
                                <p class="text-sm mb-0 text-capitalize font-weight-bold">vol: ${result.vol}</p>

                            </div>
                        </div>
                        <div class="text-danger" role="alert" id="alert"></div>
                    </div>
                </div>
            </div>
        `)
    } else {
        $('#alert').text('**Record not found')

        // setTimeout(()=>{
        //     $('#alert').text('')
        // },1000*5)
    }

    
    
});

const sendMgs = () => {
    var keyword = $('#keyword').val();
    if(keyword === ''){
        $('#alertSearch').text('**Please enter a ticker name')    
    }else{
        socket.send(keyword)
    }
    
}