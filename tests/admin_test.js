// let {user} = require ('../models')

// let chai = require('chai');
// let server = require ('../index');
// let chaiHttp = require('chai-http')
// let should = chai.should();

// chai.use(chaiHttp);

// describe('admin',() => {
//     describe('/GET dashboard',()=>{
//         it('Get admin dashboard',()=>{
//             chai.request(server)
//             .get('/admin/dashboard?page=1')
//             .set({Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmdWxsbmFtZSI6IkFkbWluIEFkbWluIiwiaWRfcm9sZSI6MX0sImlhdCI6MTYxMDk1MzIxNH0.m8zyudYbnB7Ra2TgFVEW2A5mOnY0hmpxUj2CD5Bo3ew`})
//             .end((err,res)=>{
//                 res.should.have.status(200);
//                 res.body.should.be.an('object');
//                 res.body.should.have.property('message');
//                 res.body.should.have.property('totalPage');
//                 res.body.should.have.property('result');
//                 res.body.result.should.be.an('array');
//                 // res.body.result.should.have.property('payment_date_provider');
//                 // res.body.result.should.have.property('due_date_provider');
//                 // res.body.result.should.have.property('evidence_provider');
//                 // res.body.result.should.have.property('payment_date_winner');
//                 // res.body.result.should.have.property('due_date_winner');
//                 // res.body.result.should.have.property('evidence_winner');
//                 // res.body.result.should.have.property('id_contest');
//                 // res.body.result.should.have.property('status_provider_payment');
//                 // res.body.result.should.have.property('status_winner_payment');
//                 // res.body.result.should.have.property('user');
//                 // res.body.user.should.be.an('object');
//                 // res.body.user.should.have.property('provider');
//                 // res.body.user.should.be.an('object');
//                 // res.body.result.should.have.property('contest');
//                 // res.body.contest.should.be.an('object');
//                 // res.body.contest.should.have.property('title');
//                 // res.body.contest.should.have.property('amount');
//                 // res.body.result.should.have.property('status');
//                 // res.body.status.should.be.an('object');
//                 // res.body.status.should.have.property('status')
//             })
//         })
//     })   
    
//     describe('/GET dashboard',()=>{
//         it('invalid token/unauthorized, error',()=>{
//             chai.request(server)
//             .get('/admin/dashboard?page=1')
//             .set({Authorization: `Bearer yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmdWxsbmFtZSI6IkFkbWluIEFkbWluIiwiaWRfcm9sZSI6MX0sImlhdCI6MTYxMDk1MzIxNH0.m8zyudYbnB7Ra2TgFVEW2A5mOnY0hmpxUj2CD5Bo3ew`})
//             .end((err,res)=>{
//                 res.should.have.status(401);
//                 res.body.should.be.an('object');
//                 res.body.should.have.property('status')
//                 res.body.should.have.property('message');
//             })
//         })
//     })

//     describe('/GET dashboard',()=>{
//         it('no token, error',()=>{
//             chai.request(server)
//             .get('/admin/dashboard?page=1')
//             .set({Authorization: ``})
//             .end((err,res)=>{
//                 res.should.have.status(401);
//                 res.body.should.be.an('object');
//                 res.body.should.have.property('status')
//                 res.body.should.have.property('message');
//             })
//         })
//     })
 
//     describe('/GET dashboard paid',()=>{
//         it('Get admin dashboard paid',()=>{
//             chai.request(server)
//             .get('/admin/dashboard/paid?page=1')
//             .set({Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmdWxsbmFtZSI6IkFkbWluIEFkbWluIiwiaWRfcm9sZSI6MX0sImlhdCI6MTYxMDk1MzIxNH0.m8zyudYbnB7Ra2TgFVEW2A5mOnY0hmpxUj2CD5Bo3ew`})
//             .end((err,res)=>{
//                 res.should.have.status(200);
//                 res.body.should.be.an('object');
//                 res.body.should.have.property('message');
//                 res.body.should.have.property('totalPage');
//                 res.body.should.have.property('result');
//                 res.body.result.should.be.an('array')
//                 // res.body.result.should.have.property('payment_date_provider');
//                 // res.body.result.should.have.property('due_date_provider');
//                 // res.body.result.should.have.property('evidence_provider');
//                 // res.body.result.should.have.property('payment_date_winner');
//                 // res.body.result.should.have.property('due_date_winner');
//                 // res.body.result.should.have.property('evidence_winner');
//                 // res.body.result.should.have.property('id_contest');
//                 // res.body.result.should.have.property('status_provider_payment');
//                 // res.body.result.should.have.property('status_winner_payment');
//                 // res.body.result.should.have.property('user');
//                 // res.body.user.should.be.an('object');
//                 // res.body.user.should.have.property('provider');
//                 // res.body.user.should.be.an('object');
//                 // res.body.result.should.have.property('contest');
//                 // res.body.contest.should.be.an('object');
//                 // res.body.contest.should.have.property('title');
//                 // res.body.contest.should.have.property('amount');
//                 // res.body.result.should.have.property('status');
//                 // res.body.status.should.be.an('object');
//                 // res.body.status.should.have.property('status')
//             })
//         })
//     })   

//     describe('/GET dashboard paid',()=>{
//         it('no auth error',()=>{
//             chai.request(server)
//             .get('/admin/dashboard/paid?page=1')
//             .set({Authorization: ``})
//             .end((err,res)=>{
//                 res.should.have.status(401);
//                 res.body.should.be.an('object');
//                 res.body.should.have.property('status')
//                 res.body.should.have.property('message');
//             })
//         })
//     })

//     describe('/GET dashboard paid',()=>{
//         it('Invalid token, error',()=>{
//             chai.request(server)
//             .get('/admin/dashboard/paid?page=1')
//             .set({Authorization: `Bearer yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmdWxsbmFtZSI6IkFkbWluIEFkbWluIiwiaWRfcm9sZSI6MX0sImlhdCI6MTYxMDk1MzIxNH0.m8zyudYbnB7Ra2TgFVEW2A5mOnY0hmpxUj2CD5Bo3ew`})
//             .end((err,res)=>{
//                 res.should.have.status(401);
//                 res.body.should.be.an('object');
//                 res.body.should.have.property('status')
//                 res.body.should.have.property('message');
//             })
//         })
//     })

//     describe('/GET dashboard unpaid',()=>{
//         it('Get admin dashboard unpaid',()=>{
//             chai.request(server)
//             .get('/admin/dashboard/unpaid?page=1')
//             .set({Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmdWxsbmFtZSI6IkFkbWluIEFkbWluIiwiaWRfcm9sZSI6MX0sImlhdCI6MTYxMDk1MzIxNH0.m8zyudYbnB7Ra2TgFVEW2A5mOnY0hmpxUj2CD5Bo3ew`})
//             .end((err,res)=>{
//                 res.should.have.status(200);
//                 res.body.should.be.an('object');
//                 res.body.should.have.property('message');
//                 res.body.should.have.property('totalPage');
//                 res.body.should.have.property('result');
//                 res.body.result.should.be.an('array');
//                 // res.body.result.should.have.property('payment_date_provider');
//                 // res.body.result.should.have.property('due_date_provider');
//                 // res.body.result.should.have.property('evidence_provider');
//                 // res.body.result.should.have.property('payment_date_winner');
//                 // res.body.result.should.have.property('due_date_winner');
//                 // res.body.result.should.have.property('evidence_winner');
//                 // res.body.result.should.have.property('id_contest');
//                 // res.body.result.should.have.property('status_provider_payment');
//                 // res.body.result.should.have.property('status_winner_payment');
//                 // res.body.result.should.have.property('user');
//                 // res.body.user.should.be.an('object');
//                 // res.body.user.should.have.property('provider');
//                 // res.body.user.should.be.an('object');
//                 // res.body.result.should.have.property('contest');
//                 // res.body.contest.should.be.an('object');
//                 // res.body.contest.should.have.property('title');
//                 // res.body.contest.should.have.property('amount');
//                 // res.body.result.should.have.property('status');
//                 // res.body.status.should.be.an('object');
//                 // res.body.status.should.have.property('status')
                
//             })
//         })
//     })   

//     describe('/GET dashboard unpaid',()=>{
//         it('no auth error',()=>{
//             chai.request(server)
//             .get('/admin/dashboard/unpaid?page=1')
//             .set({Authorization: ``})
//             .end((err,res)=>{
//                 res.should.have.status(401);
//                 res.body.should.be.an('object');
//                 res.body.should.have.property('status')
//                 res.body.should.have.property('message');
//             })
//         })
//     })

//     describe('/GET dashboard unpaid',()=>{
//         it('Invalid token, error',()=>{
//             chai.request(server)
//             .get('/admin/dashboard/unpaid?page=1')
//             .set({Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJmdWxsbmFtZSI6IlRvbW15IEFzbmkiLCJpZF9yb2xlIjoyfSwiaWF0IjoxNjExODM3NDk4fQ.gYx91uryifwnPgcymDZvs5ngDHu-CmMdLm85QF17yvI`})
//             .end((err,res)=>{ 
//                 res.should.have.status(401);
//                 res.body.should.be.an('object');
//                 res.body.should.have.property('status')
//                 res.body.should.have.property('message');
//             })
//         })
//     })

//     describe('/GET dashboard id contest',()=>{
//         it('Get admin dashboard by id contest',()=>{
//             chai.request(server)
//             .get('/admin/dashboard/1')
//             .set({Authorization: `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmdWxsbmFtZSI6IkFkbWluIEFkbWluIiwiaWRfcm9sZSI6MX0sImlhdCI6MTYxMTUzNDQ3M30.e_q3QN8YL1SYUmvZqJPgAXX1JFvKgUDEc5qTIIWVlZQ`})
//             .end((err,res)=>{
//                 res.should.have.status(200);
//                 res.body.should.be.an('object');
//                 res.body.should.have.property('message');
//                 res.body.should.have.property('result');
//                 res.body.result.should.be.an('object')
                
//             })
//         })
//     })  

//     describe('/GET dashboard id contest',()=>{
//         it('no auth error',()=>{
//             chai.request(server)
//             .get('/admin/dashboard/1')
//             .set({Authorization: ` `})
//             .end((err,res)=>{
//                 res.should.have.status(401);
//                 res.body.should.be.an('object');
//                 res.body.should.have.property('status')
//                 res.body.should.have.property('message');
//             })
//         })
//     })

//     // describe('/GET dashboard id contest',()=>{
//     //     it('invalid token, error',()=>{
//     //         chai.request(server)
//     //         .get('/admin/dashboard/1')
//     //         .set({Authorization: `bearer hbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmdWxsbmFtZSI6IkFkbWluIEFkbWluIiwiaWRfcm9sZSI6MX0sImlhdCI6MTYxMTUzNDQ3M30.e_q3QN8YL1SYUmvZqJPgAXX1JFvKgUDEc5qTIIWVlZQ`})
//     //         .end((err,res)=>{
//     //             res.should.have.status(401);
//     //             res.body.should.be.an('object');
//     //             res.body.should.have.property('status')
//     //             res.body.should.have.property('message');
//     //         })
//     //     })
//     // })


// })