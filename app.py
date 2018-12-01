from flask import Flask, render_template, jsonify, g
from flask_sqlalchemy import SQLAlchemy
import sqlite3
import csv 
import json
import pandas as pd


app = Flask(__name__)


# SQLalchemy setup
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///Resources/project2energy.sqlite"

db = SQLAlchemy(app)

class DfEnergy(db.Model):
    __tablename__ = 'NewEnergy'

    index = db.Column(db.Integer, primary_key=True)
    energy = db.Column(db.Integer)
    age = db.Column(db.Integer)
    number_stories = db.Column(db.Integer)
    square_feet = db.Column(db.Integer)
    plei_1 = db.Column(db.Integer) 
    plei_3 = db.Column(db.Integer)
    plug_load_consumption = db.Column(db.Integer)
    ac_consumption = db.Column(db.Integer)
    domestic_gas = db.Column(db.Integer)
    heating_gas = db.Column(db.Integer)
    Lat = db.Column(db.Integer)
    Long = db.Column(db.Integer)

# Endpoint paths 
@app.route("/data")
def energy_data():

    # query for the energy data using pandas
    df = pd.read_csv('R2_ML_Predictions.csv')
    #print(df.to_json(orient='records'))
    return df.to_json(orient='records')

@app.route('/')
def dashboard():
    return render_template('dashboard.html' )

@app.route('/datatable')
def datatable():
    return render_template('datatable.html')

@app.route('/methodology')
def methodology():
    return render_template('methodology.html')

@app.route('/aboutus')
def aboutus():
    return render_template('aboutus.html')

@app.route('/predictive-model')
def pmodel():
    return render_template('pmodel.html')

if __name__ == '__main__':
    app.run(debug=True)

# @app.route('/summary')
# def summary():
#     f = open("Resources/Source_Data/location_information.csv",'r')
#     reader = csv.reader(f)
#     return json.dumps( [ row for row in reader ])

