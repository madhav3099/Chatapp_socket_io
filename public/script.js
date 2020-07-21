let socket  = io()

$('#loginbox').show()
$('#chatbox').hide()

$('#btnstart').click(() => {
    socket.emit('login',{
        username: $('#inpusername').val(),
        password: $('#inppassword').val()
    })
})

socket.on('logged_in', () => {
    
    $('#loginbox').hide()
    $('#chatbox').show()
    window.alert('Login Successful')
})

socket.on('login_failed',() => {
    window.alert('Username or Password wrong')
})

$('#btnsendmsg').click(() => {
    socket.emit('msg_send',{
        to: $('#inptouser').val(),
        msg: $('#inpnewmsg').val()
    })
})

socket.on('msg_recvd',(data) => {
    $('#ulmsg').append($('<li>').text(
        `[${data.from}] : ${data.msg}`
    ))
})