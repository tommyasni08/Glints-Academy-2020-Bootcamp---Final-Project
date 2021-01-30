// let chai = require('chai');
// let server = require ('../index');
// let chaiHttp = require('chai-http');
// let should = chai.should();

// const Op = require('sequelize').Op;

// chai.use(chaiHttp);

// describe('payment', async ()=>{

//   describe('/GET Payment',()=> {
//     it('It Should shown the payment detail of a contest',()=>{
//       chai.request(server)
//       .get('/payment/1')
//       .set({Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmdWxsbmFtZSI6IkFkbWluIEFkbWluIiwiaWRfcm9sZSI6MX0sImlhdCI6MTYxMDg2ODkzOX0.M-aj5GlsmbOF6ntdeQMeIL5Gy2JiXYb39RvF268MRvY`})
//       .end((err,res) => {
//         res.should.have.status(200);
//         res.body.should.be.an('object');
//         res.body.should.have.property('message');
//         res.body.should.have.property('result');
//         res.body.result.should.be.an('object');
//         res.body.result.should.have.property('evidence_provider');
//         res.body.result.should.have.property('id');
//         res.body.result.should.have.property('bank_provider');
//         res.body.result.should.have.property('account_number_provider');
//         res.body.result.should.have.property('contest');
//         res.body.result.contest.should.have.property('amount');
//       })
//     })
//   })

//   describe('/GET Payment',()=> {
//     it('It Should shown errors of no id contest found',()=>{
//       chai.request(server)
//       .get('/payment/100')
//       .set({Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmdWxsbmFtZSI6IkFkbWluIEFkbWluIiwiaWRfcm9sZSI6MX0sImlhdCI6MTYxMDg2ODkzOX0.M-aj5GlsmbOF6ntdeQMeIL5Gy2JiXYb39RvF268MRvY`})
//       .end((err,res) => {
//         res.should.have.status(422);
//         res.body.should.be.an('object');
//         res.body.should.have.property('errors');
//       })
//     })
//   })

//   describe('/GET Payment',()=> {
//     it('No Authentication Errors',()=>{
//       chai.request(server)
//       .get('/payment/1')
//       .end((err,res) => {
//         res.should.have.status(401);
//         res.body.should.be.an('object');
//         res.body.should.have.property('status');
//         res.body.should.have.property('message');
//       })
//     })
//   })

//   describe('/GET Payment',()=> {
//     it('Wrong Authentication',()=>{
//       chai.request(server)
//       .get('/payment/1')
//       .set({Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJmdWxsbmFtZSI6IlRvbW15IEFzbmkiLCJpZF9yb2xlIjoyfSwiaWF0IjoxNjExODM3NDk4fQ.gYx91uryifwnPgcymDZvs5ngDHu-CmMdLm85QF17yvI`})
//       .end((err,res) => {
//         res.should.have.status(401);
//         res.body.should.be.an('object');
//         res.body.should.have.property('status');
//         res.body.should.have.property('message');
//       })
//     })
//   })

//   describe('/POST Payment Provider', ()=> {
//     it('Contest and provider not found',()=>{
//       let createContest = {
//         title:"Unit Testing Payment Provider Purpose 1",
//         prize:"100000000",
//         due_date:'2021-02-27',
//         announcement:'2021-03-01',
//         description:"Unit Testing Payment Purpose"
//       }
//       chai.request(server)
//       .post('/contest/create')
//       .set({Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJmdWxsbmFtZSI6IlRvbW15IEFzbmkiLCJpZF9yb2xlIjoyfSwiaWF0IjoxNjEwOTg2MjQwfQ.x57NYizG-YHZQOLmW9HdCPnnmBA7nubsDnTRXEXERHg`})
//       .send(createContest)
//       .end((err,res)=>{
//         contest_id = res.body.result.id
//         chai.request(server)
//         .post(`/payment/provider/100/100`)
//         .set({Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJmdWxsbmFtZSI6IlRvbW15IEFzbmkiLCJpZF9yb2xlIjoyfSwiaWF0IjoxNjEwOTg2MjQwfQ.x57NYizG-YHZQOLmW9HdCPnnmBA7nubsDnTRXEXERHg`})
//         .field('bank_provider','BRI')
//         .field('account_number_provider','1234567001')
//         .attach('evidence','tests/evidence.png')
//         .end((err,res)=>{
//           res.should.have.status(422);
//           res.body.should.be.an('object');
//           res.body.should.have.property('errors');
//         })

//       })
//     })
//   })

//   describe('/POST Payment Provider', ()=> {
//     it('No Authentication token',()=>{
//       let createContest = {
//         title:"Unit Testing Payment Provider Purpose 2",
//         prize:"100000000",
//         due_date:'2021-02-27',
//         announcement:'2021-03-01',
//         description:"Unit Testing Payment Purpose"
//       }
//       chai.request(server)
//       .post('/contest/create')
//       .set({Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJmdWxsbmFtZSI6IlRvbW15IEFzbmkiLCJpZF9yb2xlIjoyfSwiaWF0IjoxNjEwOTg2MjQwfQ.x57NYizG-YHZQOLmW9HdCPnnmBA7nubsDnTRXEXERHg`})
//       .send(createContest)
//       .end((err,res)=>{
//         contest_id = res.body.result.id
//         chai.request(server)
//         .post(`/payment/provider/${contest_id}/3`)
//         .field('bank_provider','BRI')
//         .field('account_number_provider','1234567001')
//         .attach('evidence','tests/evidence.png')
//         .end((err,res)=>{
//           res.should.have.status(401);
//           res.body.should.be.an('object');
//           res.body.should.have.property('status');
//           res.body.should.have.property('message');
//         })

//       })
//     })
//   })

//   describe('/POST Payment Provider', ()=> {
//     it('Invalid Input',()=>{
//       let createContest = {
//         title:"Unit Testing Payment Provider Purpose 3",
//         prize:"100000000",
//         due_date:'2021-02-27',
//         announcement:'2021-03-01',
//         description:"Unit Testing Payment Purpose"
//       }
//       chai.request(server)
//       .post('/contest/create')
//       .set({Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJmdWxsbmFtZSI6IlRvbW15IEFzbmkiLCJpZF9yb2xlIjoyfSwiaWF0IjoxNjEwOTg2MjQwfQ.x57NYizG-YHZQOLmW9HdCPnnmBA7nubsDnTRXEXERHg`})
//       .send(createContest)
//       .end((err,res)=>{
//         contest_id = res.body.result.id
//         chai.request(server)
//         .post(`/payment/provider/${contest_id}/3`)
//         .set({Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJmdWxsbmFtZSI6IlRvbW15IEFzbmkiLCJpZF9yb2xlIjoyfSwiaWF0IjoxNjEwOTg2MjQwfQ.x57NYizG-YHZQOLmW9HdCPnnmBA7nubsDnTRXEXERHg`})
//         .field('bank_provider','BRI')
//         .field('account_number_provider','1234567001a')
//         .attach('evidence','tests/evidence.png')
//         .end((err,res)=>{
//           res.should.have.status(422);
//           res.body.should.be.an('object');
//           res.body.should.have.property('errors');
//         })

//       })
//     })
//   })

//   describe('/POST Payment Provider', ()=> {
//     it('/It Should submit the payment evidence from the provider',()=>{
//       let createContest = {
//         title:"Unit Testing Payment Provider Purpose 4",
//         prize:"100000000",
//         due_date:'2021-02-27',
//         announcement:'2021-03-01',
//         description:"Unit Testing Payment Purpose"
//       }
//       chai.request(server)
//       .post('/contest/create')
//       .set({Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJmdWxsbmFtZSI6IlRvbW15IEFzbmkiLCJpZF9yb2xlIjoyfSwiaWF0IjoxNjEwOTg2MjQwfQ.x57NYizG-YHZQOLmW9HdCPnnmBA7nubsDnTRXEXERHg`})
//       .send(createContest)
//       .end((err,res)=>{
//         contest_id = res.body.result.id
//         chai.request(server)
//         .post(`/payment/provider/${contest_id}/3`)
//         .set({Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJmdWxsbmFtZSI6IlRvbW15IEFzbmkiLCJpZF9yb2xlIjoyfSwiaWF0IjoxNjEwOTg2MjQwfQ.x57NYizG-YHZQOLmW9HdCPnnmBA7nubsDnTRXEXERHg`})
//         .field('bank_provider','BRI')
//         .field('account_number_provider','1234567001')
//         .end((err,res)=>{
//           res.should.have.status(422);
//           res.body.should.be.an('object');
//           res.body.should.have.property('errors');
//         })

//       })
//     })
//   })
  
//   describe('/POST Payment Provider', ()=> {
//     it('/It Should submit the payment evidence from the provider',()=>{
//       let createContest = {
//         title:"Unit Testing Payment Purpose",
//         prize:"100000000",
//         due_date:'2021-02-27',
//         announcement:'2021-03-01',
//         description:"Unit Testing Payment Purpose"
//       }
//       chai.request(server)
//       .post('/contest/create')
//       .set({Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJmdWxsbmFtZSI6IlRvbW15IEFzbmkiLCJpZF9yb2xlIjoyfSwiaWF0IjoxNjEwOTg2MjQwfQ.x57NYizG-YHZQOLmW9HdCPnnmBA7nubsDnTRXEXERHg`})
//       .send(createContest)
//       .end((err,res)=>{
//         contest_id = res.body.result.id
//         chai.request(server)
//         .post(`/payment/provider/${contest_id}/3`)
//         .set({Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJmdWxsbmFtZSI6IlRvbW15IEFzbmkiLCJpZF9yb2xlIjoyfSwiaWF0IjoxNjEwOTg2MjQwfQ.x57NYizG-YHZQOLmW9HdCPnnmBA7nubsDnTRXEXERHg`})
//         .field('bank_provider','BRI')
//         .field('account_number_provider','1234567001')
//         .attach('evidence','tests/evidence.png')
//         .end((err,res)=>{
//           res.should.have.status(200);
//           res.body.should.be.an('object');
//           res.body.should.have.property('message');
//           res.body.should.have.property('result');
//           res.body.result.should.be.an('object');
//           res.body.result.should.have.property('evidence_provider');
//           res.body.result.should.have.property('id');
//           res.body.result.should.have.property('bank_provider');
//           res.body.result.should.have.property('account_number_provider');
//           res.body.result.should.have.property('user');
//           res.body.result.user.should.have.property('provider');
//           res.body.result.should.have.property('status');
//           res.body.result.status.should.have.property('contest_status');
//           res.body.result.should.have.property('contest');
//           res.body.result.contest.should.have.property('amount');
//           res.body.result.contest.should.have.property('title');
//         })

//       })
//     })
//   })

//   describe('/GET Payment Approve', ()=> {
//     it('/Error Contest not found',()=>{
//       let createContest = {
//         title:"Unit Testing Approve Purpose 1",
//         prize:"100000000",
//         due_date:'2021-02-27',
//         announcement:'2021-03-01',
//         description:"Unit Testing Payment Purpose"
//       }
//       chai.request(server)
//       .post('/contest/create')
//       .set({Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJmdWxsbmFtZSI6IlRvbW15IEFzbmkiLCJpZF9yb2xlIjoyfSwiaWF0IjoxNjEwOTg2MjQwfQ.x57NYizG-YHZQOLmW9HdCPnnmBA7nubsDnTRXEXERHg`})
//       .send(createContest)
//       .end((err,res)=>{
//         contest_id = res.body.result.id
//         chai.request(server)
//         .post(`/payment/provider/${contest_id}/3`)
//         .set({Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJmdWxsbmFtZSI6IlRvbW15IEFzbmkiLCJpZF9yb2xlIjoyfSwiaWF0IjoxNjEwOTg2MjQwfQ.x57NYizG-YHZQOLmW9HdCPnnmBA7nubsDnTRXEXERHg`})
//         .field('bank_provider','BRI')
//         .field('account_number_provider','1234567001')
//         .attach('evidence','tests/evidence.png')
//         .end((err,res)=>{
//           chai.request(server)
//           .get(`/payment/approve/100}`)
//           .set({Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmdWxsbmFtZSI6IkFkbWluIEFkbWluIiwiaWRfcm9sZSI6MX0sImlhdCI6MTYxMDg2ODkzOX0.M-aj5GlsmbOF6ntdeQMeIL5Gy2JiXYb39RvF268MRvY`})
//           .end((err,res)=>{
//             res.should.have.status(422);
//             res.body.should.be.an('object');
//             res.body.should.have.property('errors');

//           })
//         })
//       })
//     })
//   })

//   describe('/GET Payment Approve', ()=> {
//     it('No Token',()=>{
//       let createContest = {
//         title:"Unit Testing Approve Purpose 2",
//         prize:"100000000",
//         due_date:'2021-02-27',
//         announcement:'2021-03-01',
//         description:"Unit Testing Payment Purpose"
//       }
//       chai.request(server)
//       .post('/contest/create')
//       .set({Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJmdWxsbmFtZSI6IlRvbW15IEFzbmkiLCJpZF9yb2xlIjoyfSwiaWF0IjoxNjEwOTg2MjQwfQ.x57NYizG-YHZQOLmW9HdCPnnmBA7nubsDnTRXEXERHg`})
//       .send(createContest)
//       .end((err,res)=>{
//         contest_id = res.body.result.id
//         chai.request(server)
//         .post(`/payment/provider/${contest_id}/3`)
//         .set({Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJmdWxsbmFtZSI6IlRvbW15IEFzbmkiLCJpZF9yb2xlIjoyfSwiaWF0IjoxNjEwOTg2MjQwfQ.x57NYizG-YHZQOLmW9HdCPnnmBA7nubsDnTRXEXERHg`})
//         .field('bank_provider','BRI')
//         .field('account_number_provider','1234567001')
//         .attach('evidence','tests/evidence.png')
//         .end((err,res)=>{
//           chai.request(server)
//           .get(`/payment/approve/${contest_id}`)
//           .end((err,res)=>{
//             res.should.have.status(401);
//             res.body.should.be.an('object');
//             res.body.should.have.property('status');
//             res.body.should.have.property('message');
//           })
//         })
//       })
//     })
//   })

//   describe('/GET Payment Approve', ()=> {
//     it('It Should Return payment approve',()=>{
//       let createContest = {
//         title:"Unit Testing Approve Purpose 3",
//         prize:"100000000",
//         due_date:'2021-02-27',
//         announcement:'2021-03-01',
//         description:"Unit Testing Payment Purpose"
//       }
//       chai.request(server)
//       .post('/contest/create')
//       .set({Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJmdWxsbmFtZSI6IlRvbW15IEFzbmkiLCJpZF9yb2xlIjoyfSwiaWF0IjoxNjEwOTg2MjQwfQ.x57NYizG-YHZQOLmW9HdCPnnmBA7nubsDnTRXEXERHg`})
//       .send(createContest)
//       .end((err,res)=>{
//         contest_id = res.body.result.id
//         chai.request(server)
//         .post(`/payment/provider/${contest_id}/3`)
//         .set({Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJmdWxsbmFtZSI6IlRvbW15IEFzbmkiLCJpZF9yb2xlIjoyfSwiaWF0IjoxNjEwOTg2MjQwfQ.x57NYizG-YHZQOLmW9HdCPnnmBA7nubsDnTRXEXERHg`})
//         .field('bank_provider','BRI')
//         .field('account_number_provider','1234567001')
//         .attach('evidence','tests/evidence.png')
//         .end((err,res)=>{
//           chai.request(server)
//           .get(`/payment/approve/${contest_id}}`)
//           .set({Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmdWxsbmFtZSI6IkFkbWluIEFkbWluIiwiaWRfcm9sZSI6MX0sImlhdCI6MTYxMDg2ODkzOX0.M-aj5GlsmbOF6ntdeQMeIL5Gy2JiXYb39RvF268MRvY`})
//           .end((err,res)=>{
//             res.should.have.status(200);
//             res.body.should.be.an('object');
//             res.body.should.have.property('message');
//             res.body.should.have.property('result');
//             res.body.result.should.have.property('payment_date_provider');
//             res.body.result.should.have.property('evidence_provider');
//             res.body.result.should.have.property('due_date_winner');
//             res.body.result.should.have.property('id');
//             res.body.result.should.have.property('bank_provider');
//             res.body.result.should.have.property('account_number_provider');
//             res.body.result.should.have.property('status_provider_payment');
//             res.body.result.should.have.property('status_winner_payment');
//             res.body.result.should.have.property('contest');
//             res.body.result.contest.should.have.property('amount');
//             res.body.result.contest.should.have.property('title');
//             res.body.result.should.have.property('user');
//             res.body.result.user.should.have.property('provider');
//             res.body.result.should.have.property('status');
//             res.body.result.status.should.have.property('status');
//           })
//         })
//       })
//     })
//   })

//   describe('/GET Payment Reject', ()=> {
//     it('Contest not found',()=>{
//       let createContest = {
//         title:"Unit Testing Reject Purpose 1",
//         prize:"100000000",
//         due_date:'2021-02-27',
//         announcement:'2021-03-01',
//         description:"Unit Testing Payment Purpose"
//       }
//       chai.request(server)
//       .post('/contest/create')
//       .set({Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJmdWxsbmFtZSI6IlRvbW15IEFzbmkiLCJpZF9yb2xlIjoyfSwiaWF0IjoxNjEwOTg2MjQwfQ.x57NYizG-YHZQOLmW9HdCPnnmBA7nubsDnTRXEXERHg`})
//       .send(createContest)
//       .end((err,res)=>{
//         contest_id = res.body.result.id
//         chai.request(server)
//         .post(`/payment/provider/${contest_id}/3`)
//         .set({Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJmdWxsbmFtZSI6IlRvbW15IEFzbmkiLCJpZF9yb2xlIjoyfSwiaWF0IjoxNjEwOTg2MjQwfQ.x57NYizG-YHZQOLmW9HdCPnnmBA7nubsDnTRXEXERHg`})
//         .field('bank_provider','BRI')
//         .field('account_number_provider','1234567001')
//         .attach('evidence','tests/evidence.png')
//         .end((err,res)=>{
//           chai.request(server)
//           .get(`/payment/reject/100`)
//           .set({Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmdWxsbmFtZSI6IkFkbWluIEFkbWluIiwiaWRfcm9sZSI6MX0sImlhdCI6MTYxMDg2ODkzOX0.M-aj5GlsmbOF6ntdeQMeIL5Gy2JiXYb39RvF268MRvY`})
//           .end((err,res)=>{
//             res.should.have.status(422);
//             res.body.should.be.an('object');
//             res.body.should.have.property('errors');
//           })
//         })
//       })
//     })
//   })

//   describe('/GET Payment Reject', ()=> {
//     it('No Token',()=>{
//       let createContest = {
//         title:"Unit Testing Reject Purpose 2",
//         prize:"100000000",
//         due_date:'2021-02-27',
//         announcement:'2021-03-01',
//         description:"Unit Testing Payment Purpose"
//       }
//       chai.request(server)
//       .post('/contest/create')
//       .set({Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJmdWxsbmFtZSI6IlRvbW15IEFzbmkiLCJpZF9yb2xlIjoyfSwiaWF0IjoxNjEwOTg2MjQwfQ.x57NYizG-YHZQOLmW9HdCPnnmBA7nubsDnTRXEXERHg`})
//       .send(createContest)
//       .end((err,res)=>{
//         contest_id = res.body.result.id
//         chai.request(server)
//         .post(`/payment/provider/${contest_id}/3`)
//         .set({Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJmdWxsbmFtZSI6IlRvbW15IEFzbmkiLCJpZF9yb2xlIjoyfSwiaWF0IjoxNjEwOTg2MjQwfQ.x57NYizG-YHZQOLmW9HdCPnnmBA7nubsDnTRXEXERHg`})
//         .field('bank_provider','BRI')
//         .field('account_number_provider','1234567001')
//         .attach('evidence','tests/evidence.png')
//         .end((err,res)=>{
//           chai.request(server)
//           .get(`/payment/reject/${contest_id}}`)
//           .end((err,res)=>{
//             res.should.have.status(401);
//             res.body.should.be.an('object');
//             res.body.should.have.property('message');
//           })
//         })
//       })
//     })
//   })

//   describe('/GET Payment Reject', ()=> {
//     it('It Should Return payment reject',()=>{
//       let createContest = {
//         title:"Unit Testing Reject Purpose 3",
//         prize:"100000000",
//         due_date:'2021-02-27',
//         announcement:'2021-03-01',
//         description:"Unit Testing Payment Purpose"
//       }
//       chai.request(server)
//       .post('/contest/create')
//       .set({Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJmdWxsbmFtZSI6IlRvbW15IEFzbmkiLCJpZF9yb2xlIjoyfSwiaWF0IjoxNjEwOTg2MjQwfQ.x57NYizG-YHZQOLmW9HdCPnnmBA7nubsDnTRXEXERHg`})
//       .send(createContest)
//       .end((err,res)=>{
//         contest_id = res.body.result.id
//         chai.request(server)
//         .post(`/payment/provider/${contest_id}/3`)
//         .set({Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJmdWxsbmFtZSI6IlRvbW15IEFzbmkiLCJpZF9yb2xlIjoyfSwiaWF0IjoxNjEwOTg2MjQwfQ.x57NYizG-YHZQOLmW9HdCPnnmBA7nubsDnTRXEXERHg`})
//         .field('bank_provider','BRI')
//         .field('account_number_provider','1234567001')
//         .attach('evidence','tests/evidence.png')
//         .end((err,res)=>{
//           chai.request(server)
//           .get(`/payment/reject/${contest_id}}`)
//           .set({Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmdWxsbmFtZSI6IkFkbWluIEFkbWluIiwiaWRfcm9sZSI6MX0sImlhdCI6MTYxMDg2ODkzOX0.M-aj5GlsmbOF6ntdeQMeIL5Gy2JiXYb39RvF268MRvY`})
//           .end((err,res)=>{
//             res.should.have.status(200);
//             res.body.should.be.an('object');
//             res.body.should.have.property('message');
//           })
//         })
//       })
//     })
//   })

//   describe('/POST Payment Admin',() => {
//     it('It should submit the payment evidence to the winner', () => {
//       chai.request(server)
//       .post('/payment/admin/16/11')
//       .attach('evidence','tests/evidence.png')
//       .end((err,res) => {        
//         res.should.have.status(401);
//         res.body.should.be.an('object');
//         res.body.should.have.property('message');
//       })
//     })
//   })

//   describe('/POST Payment Admin',() => {
//     it('No Contest Id and user', () => {
//       chai.request(server)
//       .post('/payment/admin/100/100')
//       .set({Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmdWxsbmFtZSI6IkFkbWluIEFkbWluIiwiaWRfcm9sZSI6MX0sImlhdCI6MTYxMDk2NDU4NH0.RYZ9SAAS2fA2yZu7Ju5Hi-i0jfo5tMcmZEg3rfa7-p8`})
//       .attach('evidence','tests/evidence.png')
//       .end((err,res) => {        
//         res.should.have.status(422);
//         res.body.should.be.an('object');
//         res.body.should.have.property('errors');
//       })
//     })
//   })

//   describe('/POST Payment Admin',() => {
//     it('Invalid Input', () => {
//       chai.request(server)
//       .post('/payment/admin/16/11')
//       .set({Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmdWxsbmFtZSI6IkFkbWluIEFkbWluIiwiaWRfcm9sZSI6MX0sImlhdCI6MTYxMDk2NDU4NH0.RYZ9SAAS2fA2yZu7Ju5Hi-i0jfo5tMcmZEg3rfa7-p8`})
//       .end((err,res) => {        
//         res.should.have.status(422);
//         res.body.should.be.an('object');
//         res.body.should.have.property('errors');
//       })
//     })
//   })
 
//   describe('/POST Payment Admin',() => {
//     it('It should submit the payment evidence to the winner', () => {
//       chai.request(server)
//       .post('/payment/admin/16/11')
//       .set({Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmdWxsbmFtZSI6IkFkbWluIEFkbWluIiwiaWRfcm9sZSI6MX0sImlhdCI6MTYxMDk2NDU4NH0.RYZ9SAAS2fA2yZu7Ju5Hi-i0jfo5tMcmZEg3rfa7-p8`})
//       .attach('evidence','tests/evidence.png')
//       .end((err,res) => {        
//         res.should.have.status(200);
//         res.body.should.be.an('object');
//         res.body.should.have.property('message');
//         res.body.should.have.property('result');
//         res.body.result.should.be.an('object');
//         res.body.result.should.have.property('payment_date_winner');
//         res.body.result.should.have.property('evidence_winner');
//         res.body.result.should.have.property('id');
//         res.body.result.should.have.property('winner');
//         res.body.result.should.have.property('bank_winner');
//         res.body.result.should.have.property('account_number_winner');
//         res.body.result.should.have.property('status_winner_payment');
//         res.body.result.should.have.property('user');
//         res.body.result.user.should.have.property('provider');
//         res.body.result.should.have.property('status');
//         res.body.result.status.should.have.property('status');
//         res.body.result.should.have.property('contest');
//         res.body.result.contest.should.have.property('amount');
//         res.body.result.contest.should.have.property('title');
//       })
//     })
//   })











// })
