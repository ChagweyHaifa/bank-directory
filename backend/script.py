from typing import Optional
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import mysql.connector
import json
from pydantic import BaseModel

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class State(BaseModel):
    id: int
    name: str


class Agency(BaseModel):
    id: int
    city: str
    address: str
    manager: str
    phoneNumber: str
    fax: str
    email: str
    stateId: int


def connectToDB():
    mydb = mysql.connector.connect(
        host="localhost", user="root", password="", database="bank-directory", port=3307)
    return mydb


@app.get("/stateList")
def getStateList():
    mydb = connectToDB()
    myCursor = mydb.cursor()
    sql_query = "select * from state order by name"
    myCursor.execute(sql_query)
    # list of tuples
    list_of_rows = myCursor.fetchall()
    # list of dict
    states = []
    for (id, name) in list_of_rows:
        state = {}
        state['id'] = id
        state['name'] = name
        states.append(state)
    data = {}
    data['states'] = states
    # data['test'] = 5
    return data


@app.get("/agencyList/{stateId}")
def getAgencyList(stateId: str):
    mydb = connectToDB()
    myCursor = mydb.cursor()

    sql_query = f"select * from agency where state_id = {stateId}"
    # sql_query = f"select * from agency where state_id = (select id from state where name ='{stateName}')"

    myCursor.execute(sql_query)
    # list of tuples
    list_of_rows = myCursor.fetchall()
    # list of dict
    agencies = []
    for (id, city, address, manager, phoneNumber, fax, email, stateId) in list_of_rows:
        agency = {}
        agency['id'] = id
        agency['city'] = city
        agency['address'] = address
        agency['manager'] = manager
        agency['phoneNumber'] = phoneNumber
        agency['fax'] = fax
        agency['email'] = email
        agency['stateId'] = stateId
        agencies.append(agency)
    data = {}
    data['agencies'] = agencies
    # data['test'] = 5
    return data


@app.post("/newAgency")
def getAgencyDetails(agency: dict):
    mydb = connectToDB()
    myCursor = mydb.cursor()
    # print("added agency",agency)
    # sql_query = f'insert into agency (city,address,manager,phone_number,fax,email,state_id) values ({agency["city"]}, {agency["address"]}, {agency["manager"]},{agency["phoneNumber"]}, {agency["fax"]}, {agency["email"]}, {agency["stateId"]}); '
    sql_query = f'insert into agency (city,address,manager,phone_number,fax,email,state_id) values (%s,%s,%s,%s,%s,%s,%s) ; '

    myCursor.execute(sql_query, (agency["city"], agency["address"], agency["manager"],
                     agency["phoneNumber"], agency["fax"], agency["email"], agency["stateId"]))
    mydb.commit()


@app.post("/updateAgency")
def updateAgency(agency: dict):
    mydb = connectToDB()
    myCursor = mydb.cursor()
    print("edited agency", agency)
    sql_query = "update agency set city = %s, address= %s, manager = %s, phone_number =%s, fax =%s, email =%s , state_id =%s where id = %s;"
    myCursor.execute(
        sql_query, (agency["city"], agency["address"], agency["manager"], agency["phoneNumber"], agency["fax"], agency["email"], agency["stateId"], agency["id"]))
    mydb.commit()


@app.get("/deleteAgency/{agencyId}")
def deleteAgency(agencyId):
    print("agencyId =", agencyId)
    mydb = connectToDB()
    myCursor = mydb.cursor()
    sql_query = f"delete from agency where id = {agencyId}"
    myCursor.execute(sql_query)
    mydb.commit()
