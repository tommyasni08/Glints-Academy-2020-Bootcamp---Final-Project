// let {
//     user
// } = require('../models')

// let chai = require('chai');
// let server = require('../index');
// let chaiHttp = require('chai-http')
// let should = chai.should();

// chai.use(chaiHttp);

// describe('user', () => {

//     describe('/POST Register', () => {
//         it('it should register a A user', () => {
//             (done) => {
//                 chai.request(server)
//                     .post('/user/register')
//                     .send({
//                         nama: 'Unit Testing',
//                         email: 'unit@example.com',
//                         password: '12345678',
//                         passwordConfirmation: '12345678',
//                         role: 3
//                     })
//                     .end((err, res) => {
//                         res.should.have.status(200);
//                         res.body.should.be.an('object');
//                         res.body.should.have.property('message');
//                         res.body.should.have.property('token');
//                         done();
//                     });
//             }
//         })
//     })

//     describe('/POST Login', () => {
//         it('it should login a user', () => {
//             (done) => {
//                 chai.request(server)
//                     .post('/user/register')
//                     .send({
//                         nama: 'Unit Testing',
//                         password: '12345678',

//                     })
//                     .set({
//                         Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMiwiZnVsbG5hbWUiOiJVbml0IFRlc3RpbmciLCJpZF9yb2xlIjozfSwiaWF0IjoxNjExNjk3MzE1fQ.yCUKMSvYYRHGHbHhOZClc8FKsHKLnbANdD4Km-_Ip7o`
//                     })
//                     .end((err, res) => {
//                         res.should.have.status(200);
//                         res.body.should.be.an('object');
//                         res.body.should.have.property('message');
//                         res.body.should.have.property('token');
//                         done();
//                     });
//             }
//         })
//     })

//     describe('/GET Profile', () => {
//         it('get user profile', () => {
//             (done) => {
//                 chai.request(server)
//                     .get('/user/profile')
//                     .set({
//                         Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMiwiZnVsbG5hbWUiOiJVbml0IFRlc3RpbmciLCJpZF9yb2xlIjozfSwiaWF0IjoxNjExNjk3MzE1fQ.yCUKMSvYYRHGHbHhOZClc8FKsHKLnbANdD4Km-_Ip7o`
//                     })
//                     .end((err, res) => {
//                         res.should.have.status(200);
//                         res.body.should.be.an('object');
//                         res.body.should.have.property('message');
//                         res.body.should.have.property('result');
//                         done();
//                     });
//             }
//         })
//     })

//     describe('/PATCH Update user profile', () => {
//         it('Update user profile', () => {
//             (done) => {
//                 chai.request(server)
//                     .patch('/user/profile/update/12')
//                     .set({
//                         Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMiwiZnVsbG5hbWUiOiJVbml0IFRlc3RpbmciLCJpZF9yb2xlIjozfSwiaWF0IjoxNjExNjk3MzE1fQ.yCUKMSvYYRHGHbHhOZClc8FKsHKLnbANdD4Km-_Ip7o`
//                     })
//                     .set('content-type', 'multipart/form-data')
//                     .field('firstname', 'Unit')
//                     .field('lastname', 'Testing')
//                     .field('location', 'Jakarta')
//                     .field('bank', 'BCA')
//                     .field('account_number', '123456789')
//                     .attach('picture', 'public/img/user_12_picture.png')
//                     .end((err, res) => {
//                         res.should.have.status(200);
//                         res.body.should.be.a('object');
//                         res.body.should.have.property('message');
//                         res.body.should.have.property('result');
//                         done();
//                     })
//             }
//         })
//     })


// })