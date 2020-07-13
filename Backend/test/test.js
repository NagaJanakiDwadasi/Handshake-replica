var app = require('../index');
var chai = require('chai');
chai.use(require('chai-http'));
var expect = require('chai').expect;
const should = chai.should();

var agent = require('chai').request.agent('http://localhost:3001');

describe('Objective', function(){

    it('GET /student/profileGetObjective - Verifying objective of student id 6',function(done){
        agent.get('/student/profileGetObjective/'+6)
            .then(function(res){
                console.log("___________________IN CHAI ______________________")
                res.text.should.be.eql('Why I am not fetched');
                done();
            })
            .catch((e) => {
                done(e);
            });
    });

    it('GET /students/getAllStudents - Verifying statusCode',function(done){
        agent.get('/students/getAllStudents')
            .then(function(res){
                console.log("___________________IN CHAI ______________________")
                res.statusCode.should.be.eql(200);
                done();
            })
            .catch((e) => {
                done(e);
            });
    });

    it('GET /students/getAllEvents - Verifying status',function(done){
        agent.get('/students/getAllEvents')
            .then(function(res){
                console.log("___________________IN CHAI ______________________")
                //console.log(res);
                //expect(res.statusCode).to.equalIgnoreCase("");
                res.status.should.be.eql(200);
                done();
            })
            .catch((e) => {
                done(e);
            });
    });

    it('GET /student/fetchStudentExperienceDetails - Verifying statusCode',function(done){
        agent.get('/student/fetchStudentExperienceDetails/'+6)
            .then(function(res){
                console.log("___________________IN CHAI ______________________")
                console.log(res);
                //expect(res.statusCode).to.equalIgnoreCase("");
                res.statusCode.should.be.eql(200);
                done();
            })
            .catch((e) => {
                done(e);
            });
    });


    it('GET /student/profileGetSkillSet - Verifying skillset of student id 6',function(done){
        agent.get('/student/profileGetSkillSet/'+6)
            .then(function(res){
                console.log("___________________IN CHAI ______________________")

                //expect(res.text).to.equalIgnoreCase("Why I am not fetched");
                res.text.should.be.eql('Java,SQL,R,Python');
                done();
            })
            .catch((e) => {
                done(e);
            });
    });

})