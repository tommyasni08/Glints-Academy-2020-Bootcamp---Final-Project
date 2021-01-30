// let {
//     user
// } = require('../models')

// let chai = require('chai');
// let server = require('../index');
// let chaiHttp = require('chai-http')
// let fs = require('fs')
// let should = chai.should();

// chai.use(chaiHttp);

// describe('contest', () => {

//     describe('/POST category', () => {
//         it('it will show contest', () => {
//             chai.request(server)
//                 .post('/contest/search/category?page=1')
//                 .set({
//                     Authorization: `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo4LCJmdWxsbmFtZSI6IkRld2kgU2FyYXN3YXRpIiwiaWRfcm9sZSI6M30sImlhdCI6MTYxMDY1MjUzM30.NFqd4G8gHbwMrhqwQ_k9xqfDVcq_RaAkjmoECNZTs_8`
//                 })
//                 .send({
//                     contest: 'design'
//                 })

//                 .end((err, res) => {
//                     res.should.have.status(200);
//                     res.body.should.be.an('object');
//                     res.body.should.have.property('message');
//                     res.body.should.have.property('totalResult');
//                     res.body.should.have.property('totalPage');
//                     res.body.should.have.property('result');
//                     res.body.result.should.be.an('array');
//                 })

//         })
//     })

//     describe('/GET contest based on id', () => {
//         it('Get contest based on id contest', () => {
//             chai.request(server)
//                 .get('/contest/2')
//                 .set({
//                     Authorization: `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJmdWxsbmFtZSI6IlNlbGkgUm9zcmlhbmEiLCJpZF9yb2xlIjoyfSwiaWF0IjoxNjEwNjUzNDA5fQ.XWvPFwTQv3TGzmxq8LGskOzelJTV1HR0U8SnYNuz6Xw`
//                 })
//                 .end((err, res) => {
//                     res.should.have.status(200);
//                     res.body.should.be.an('object');
//                     res.body.should.have.property('message');
//                     res.body.should.have.property('result');
//                     res.body.result.should.be.an('object');
//                 })
//         })
//     })

//     describe('/POST GET MyContest', () => {
//         it('will get contest that has been made by user', () => {
//             chai.request(server)
//                 .post('/contest/mycontest?page=1')
//                 .set({
//                     Authorization: `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJmdWxsbmFtZSI6IlNlbGkgUm9zcmlhbmEiLCJpZF9yb2xlIjoyfSwiaWF0IjoxNjEwNjUzNDA5fQ.XWvPFwTQv3TGzmxq8LGskOzelJTV1HR0U8SnYNuz6Xw`
//                 })
//                 .send({
//                     status: 1,
//                     contest: ''
//                 })
//                 .end((err, res) => {
//                     res.should.have.status(200);
//                     res.body.should.be.an('object');
//                     res.body.should.have.property('message');
//                     res.body.should.have.property('totalResult');
//                     res.body.should.have.property('totalPage');
//                     res.body.should.have.property('result');
//                     res.body.result.should.be.an('array');
//                 })
//         })
//     })

//     describe('/POST create contest', () => {
//         it('it will create contest', () => {
//             chai.request(server)
//                 .post('/contest/create')
//                 .set({
//                     Authorization: `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJmdWxsbmFtZSI6IlRvbW15IEFzbmkiLCJpZF9yb2xlIjoyfSwiaWF0IjoxNjExNzI2NjE5fQ.MefJiK42oiwQVu-49SRxBPglsXqYjH9TWcrJRZsJ73A`
//                 })
//                 .send({
//                     title: "unittesting10",
//                     prize: "1000000",
//                     due_date: "2021-02-23",
//                     description: "nam,dna,",
//                     announcement: "2021-02-25"
//                 })
//                 .end((err, res) => {
//                     res.should.have.status(200);
//                     res.body.should.be.an('object');
//                     res.body.should.have.property('message');
//                     res.body.should.have.property('result');
//                     res.body.result.should.be.an('object');
//                 })
//         })
//     })

//     describe('/POST Submit', () => {
//         it('it will submit image from participant', () => {
//             let createContest = {
//                 title: "Unit Testing Payment Purpose 6",
//                 prize: "100000000",
//                 due_date: '2021-02-27',
//                 announcement: '2021-03-01',
//                 description: "Unit Testing Payment Purpose"
//             }
//             chai.request(server)
//                 .post('/contest/create')
//                 .set({
//                     Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJmdWxsbmFtZSI6IlRvbW15IEFzbmkiLCJpZF9yb2xlIjoyfSwiaWF0IjoxNjEwOTg2MjQwfQ.x57NYizG-YHZQOLmW9HdCPnnmBA7nubsDnTRXEXERHg`
//                 })
//                 .send(createContest)
//                 .end((err, res) => {
//                     contest_id = res.body.result.id
//                     chai.request(server)
//                         .post(`/payment/provider/${contest_id}/3`)
//                         .set({
//                             Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJmdWxsbmFtZSI6IlRvbW15IEFzbmkiLCJpZF9yb2xlIjoyfSwiaWF0IjoxNjEwOTg2MjQwfQ.x57NYizG-YHZQOLmW9HdCPnnmBA7nubsDnTRXEXERHg`
//                         })
//                         .field('bank_provider', 'BRI')
//                         .field('account_number_provider', '1234567001')
//                         .attach('evidence', 'tests/evidence.png')
//                         .end((err, res) => {
//                             chai.request(server)
//                                 .get(`/payment/approve/${contest_id}`)
//                                 .set({
//                                     Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmdWxsbmFtZSI6IkFkbWluIEFkbWluIiwiaWRfcm9sZSI6MX0sImlhdCI6MTYxMDg2ODkzOX0.M-aj5GlsmbOF6ntdeQMeIL5Gy2JiXYb39RvF268MRvY`
//                                 })
//                                 .end((err, res) => {
//                                     chai.request(server)
//                                         .post(`/contest/submit/${contest_id}/11`)
//                                         .set({
//                                             Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMSwiZnVsbG5hbWUiOiJHYWx1aCBSYWthIiwiaWRfcm9sZSI6M30sImlhdCI6MTYxMTcyNTc5Nn0.3eLoQL3tW_TEzv082gI0py7FxBGvGtT1V-QPmHcr0jc`
//                                         })
//                                         // .set('content-type', 'multipart/form-data')
//                                         // .set('content-type', 'application/x-www-form-urlencoded')
//                                         // .attach('image',fs.readFileSync(${__dirname}/test.jpeg),'tests/test.jpeg')
//                                         .field('description', 'lorem')
//                                         .attach('image', 'tests/test.jpeg')
//                                         .end((err, res) => {
//                                             res.should.have.status(200);
//                                             res.body.should.be.an('object');
//                                             res.body.should.have.property('message');
//                                             res.body.should.have.property('contest_title');
//                                             res.body.should.have.property('provider');
//                                             res.body.should.have.property('participant');
//                                             res.body.should.have.property('description');
//                                             res.body.should.have.property('submission');
//                                             res.body.submission.should.be.an('array');
//                                         })
//                                 })
//                         })
//                 })
//         })
//     })

//     describe('/GET contest submission', () => {
//         it('Get contest submission', () => {

//             chai.request(server)
//                 .get('/contest/submission/11')
//                 .set({
//                     Authorization: `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMSwiZnVsbG5hbWUiOiJHYWx1aCBSYWthIiwiaWRfcm9sZSI6M30sImlhdCI6MTYxMDgwODU0OH0.f_Pc0Hb3PHWsHhQFkKwoxxK8KDxpyx34TSVJjLJdlIs`
//                 })
//                 .end((err, res) => {
//                     res.should.have.status(200);
//                     res.body.should.be.an('object');
//                     res.body.should.have.property('message');
//                     res.body.should.have.property('result');
//                     res.body.result.should.be.an('array');
//                 })
//         })
//     })

//     describe('/GET update winner', () => {
//         it('Get update contest winner', () => {
//             chai.request(server)
//                 .get('/contest/update/close/5/3')
//                 .set({
//                     Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJmdWxsbmFtZSI6IlRvbW15IEFzbmkiLCJpZF9yb2xlIjoyfSwiaWF0IjoxNjExNzI2NjE5fQ.MefJiK42oiwQVu-49SRxBPglsXqYjH9TWcrJRZsJ73A`
//                 })
//                 .end((err, res) => {
//                     chai.request(server)
//                         .get('/contest/update/winner/3/82')
//                         .set({
//                             Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJmdWxsbmFtZSI6IlRvbW15IEFzbmkiLCJpZF9yb2xlIjoyfSwiaWF0IjoxNjExNzI2NjE5fQ.MefJiK42oiwQVu-49SRxBPglsXqYjH9TWcrJRZsJ73A`
//                         })
//                         .end((err, res) => {
//                             res.should.have.status(200);
//                             res.body.should.be.an('object');
//                             res.body.should.have.property('message');
//                             res.body.should.have.property('result');
//                             res.body.result.should.be.an('object');
//                         })
//                 })
//         })
//     })

//     describe('/GET win contest', () => {
//         it('get win contest', () => {
//             (done) => {
//                 chai.request(server)
//                     .get('/contest/winContest?page=1')
//                     .set({
//                         Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMSwiZnVsbG5hbWUiOiJHYWx1aCBSYWthIiwiaWRfcm9sZSI6M30sImlhdCI6MTYxMTMxNTQzN30.6yVw4Q13ZJc5viSbe_UYfRpqrGDR_iUlP1swLsSCvos`
//                     })
//                     .end((err, res) => {
//                         res.should.have.status(200);
//                         res.body.should.be.an('object');
//                         res.body.should.have.property('message');
//                         res.body.should.have.property('totalResult');
//                         res.body.should.have.property('totalPage');
//                         res.body.should.have.property('result');

//                     });
//             }
//         })
//     })

//     describe('/POST Get All Contest', () => {
//         it('get all contest by input title', () => {
//             (done) => {
//                 chai.request(server)
//                     .post('/contest/getAllContest?page=1')
//                     .send({
//                         contest: 'logo'
//                     })
//                     .end((err, res) => {
//                         res.should.have.status(200);
//                         res.body.should.be.an('object');
//                         res.body.should.have.property('message');
//                         res.body.should.have.property('totalResult');
//                         res.body.should.have.property('totalPage');
//                         res.body.should.have.property('result');

//                     });
//             }
//         })
//     })

//     describe('/GET Winner', () => {
//         it('get winner', () => {
//             (done) => {
//                 chai.request(server)
//                     .get('/contest/winner/9)                    ')
//                     .set({
//                         Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo2LCJmdWxsbmFtZSI6IlBhbmppIEJheXUiLCJpZF9yb2xlIjozfSwiaWF0IjoxNjExNzE0MjM4fQ.LQoT8NneMadtJMNwovuCiksFgTBkwbtnaM0mL-JBZ4A`
//                     })
//                     .end((err, res) => {
//                         res.should.have.status(200);
//                         res.body.should.be.an('object');
//                         res.body.should.have.property('message');
//                         res.body.should.have.property('result');
//                         res.body.should.have.property('user');

//                     });
//             }
//         })
//     })

//     describe('/GET Contest Close', () => {
//         it('/It Should close contest', () => {
         
//             chai.request(server)
//             .post('/contest/getAllContest')
//                 .set({
//                     Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJmdWxsbmFtZSI6IlRvbW15IEFzbmkiLCJpZF9yb2xlIjoyfSwiaWF0IjoxNjEwOTg2MjQwfQ.x57NYizG-YHZQOLmW9HdCPnnmBA7nubsDnTRXEXERHg`
//                 })               
//                 .end((err, res) => {                    
//                     contest_data = res.body.result.find(el => el.status.status == "Open")              
//                     contest_id = contest_data.id 
//                     // console.log(contest_id)
//                     chai.request(server)
//                         .post(`/payment/provider/${contest_id}/3`)
//                         .set({
//                             Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJmdWxsbmFtZSI6IlRvbW15IEFzbmkiLCJpZF9yb2xlIjoyfSwiaWF0IjoxNjEwOTg2MjQwfQ.x57NYizG-YHZQOLmW9HdCPnnmBA7nubsDnTRXEXERHg`
//                         })
//                         .field('bank_provider', 'BRI')
//                         .field('account_number_provider', '1234567001')
//                         .attach('evidence', 'tests/evidence.png')
//                         .end((err, res) => {                           
//                             chai.request(server)
//                                 .get(`/payment/approve/${contest_id}`)
//                                 .set({
//                                     Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmdWxsbmFtZSI6IkFkbWluIEFkbWluIiwiaWRfcm9sZSI6MX0sImlhdCI6MTYxMDg2ODkzOX0.M-aj5GlsmbOF6ntdeQMeIL5Gy2JiXYb39RvF268MRvY`
//                                 })
//                                 .end((err, res) => {

//                                     chai.request(server)
//                                         .get(`contest/update/close/${contest_id}/3`)
//                                         .set({
//                                             Authorization: `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJmdWxsbmFtZSI6IlRvbW15IEFzbmkiLCJpZF9yb2xlIjoyfSwiaWF0IjoxNjEwOTg2MjQwfQ.x57NYizG-YHZQOLmW9HdCPnnmBA7nubsDnTRXEXERHg`
//                                         })
//                                         .end((err, res) => {                                          
//                                             res.should.have.status(200);
//                                             res.body.should.be.an('object');
//                                             res.body.should.have.property('message');
//                                             res.body.should.have.property('result');
//                                             res.body.result.should.be.an('object');
//                                         })

//                                 })
//                         })
//                 })
//         })
//     })
// })