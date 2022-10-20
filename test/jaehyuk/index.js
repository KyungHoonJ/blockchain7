app.get('/오른손', ()=>{
    오른손 악수
})
app.get('/왼손', ()=>{
왼손 악수
})
app.get('/오른손바닥', ()=>{
핸드폰
})
app.get('/왼손바닥', ()=>{
책
})
app.post('/오른손', (req, res)=>{
    if(req.body.핸드폰){
        핸드폰을 받는다.
    }else if(req.body.워치){
        워치를 정규에게 준다.
    }
})