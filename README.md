<h1 align="center">Reelo Backend Task 🧭</h1>

## 📚 | Problem Statement

- Design and implement a Question Paper Generator application

- The application must store a number of questions in a Question Store. A question can have the following attributes {question, subject, topic, difficulty, marks}

  <aside> 💡 `{“What is the speed of light”, “Physics”, “Waves”, “Easy”, 5}`

</aside>

- The Question paper Generator should look for questions in the Question Store and then generate the question paper based on the total marks and the distribution of marks based on _Difficulty_



## 🎯 | Sample Queries

Assume the below requirement for a question paper:

> (100 marks, Difficulty, {20% Easy, 50% Medium, 30% Hard })

The problem statement here is that you need to generate a question paper of 100 marks total of which 20% (ie, 20 marks) worth of questions should have the _Difficulty_=Easy, 50% having _Difficulty_=Medium and 30% having _Difficulty_=Hard

## 🌐 | Test Project

- Clone this repository.
- Install Docker Desktop.
- Create a `.env` file in the root directory of the web-server folder with credentials `MONGODB_URI=mongodb://localhost:27017/question_paper`
- Run `docker-compose build` in the root directory of the project. This process takes a a minute or two to complete, for the first time.
- Run `docker-compose up --scale web-server=3` to initialize 3 load balanced web servers running on port 3000 to handle failovers.
- Hit up a get request on `http://localhost:3000/api/` to connect to DB and load test data.
- Hit up a get request on route `http://localhost:3000/api/getPaper` with json body              `{
  "totalMarks":50,
  "Easy":0,
  "Medium":60,
  "Hard":40
}` to the generate a test paper.

<br/>


### Features Implemented:

- The web-service is Load Balanced to avoid failover.
- The web service is dockerized to ease out deployment and production.
- The web-service can load test data statically through already provided data.
- Web Service can generate a paper for any number of total marks given as long as its feasible and those number of questions exist.

### Current Architecture:

- Containerized approach to solving the problem statement.
- Given the **Non-Blocking and Async Code Execution** of NodeJS the code doesn't get blocked of delayed due to a resource consuming task. 
- **MongoDB** is being used as a DB in this service. Due to the service requirements a NoSQL DB like MongoDB with a huge community support and high read and write speeds was a good match.
- The service is load balanced using **Nginx** in order to withstand large number of incoming api requests and failovers.

### Future Scope:

- The current architecture is a very basic implementation of the problem statement.
- Depending upon the scale, the entire architecture can be **scaled horizontally**.
- Load Balancing can be further implemented to handle high volumes of requests efficiently. We might use **AWS ELB**.
- Topic wise paper generation can be implemented in order to specify the paper generation scope.
