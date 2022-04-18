let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);


describe('Test ping API', () => {
    it('it should return message true', (done) => {
      chai.request('http://localhost:3000')
          .get('/api/ping')
          .end((err, res) => {
                console.log(res.body);
                res.should.have.status(200);
                res.body.should.have.property('success').eql(true);
            done();
          });
    });
});

describe('Test post with no tags', () => {
    it('it should return error message', (done) => {
      chai.request('http://localhost:3000')
          .get('/api/posts')
          .end((err, res) => {
                console.log(res.body);
                res.should.have.status(400);
                res.body.should.have.property('error').eql('Tags parameter is required');
            done();
          });
    });
});

describe('Test post with invalid sortBy', () => {
    it('it should return error message', (done) => {
      chai.request('http://localhost:3000')
          .get('/api/posts?tags=tech,history&sortBy=invalid')
          .end((err, res) => {
                console.log(res.body);
                res.should.have.status(400);
                res.body.should.have.property('error').eql('sortBy parameter is invalid');
            done();
          });
    });
});


describe('Test post with invalid direction', () => {
    it('it should return error message', (done) => {
      chai.request('http://localhost:3000')
          .get('/api/posts?tags=tech,history&direction=invalid')
          .end((err, res) => {
                console.log(res.body);
                res.should.have.status(400);
                res.body.should.have.property('error').eql('direction parameter is invalid');
            done();
          });
    });
});


describe('Test post with valid params', () => {
    it('it should return posts', (done) => {
      chai.request('http://localhost:3000')
          .get('/api/posts?tags=tech,history&sortBy=id&direction=asc')
          .end((err, res) => {
                // console.log(res.body);
                res.should.have.status(200);
                res.body.should.have.property('posts');
                res.body['posts'][0]['id'].should.eql(1);
            done();
          });
    });
});


describe('Test post with valid params', () => {
    it('it should return posts', (done) => {
      chai.request('http://localhost:3000')
          .get('/api/posts?tags=tech,history&sortBy=id&direction=desc')
          .end((err, res) => {
                // console.log(res.body);
                res.should.have.status(200);
                res.body.should.have.property('posts');
                res.body['posts'][0]['id'].should.eql(59);
            done();
          });
    });
})