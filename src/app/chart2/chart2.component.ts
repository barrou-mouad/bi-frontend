import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import Chart from 'chart.js/auto';
@Component({
  selector: 'app-chart2',
  templateUrl: './chart2.component.html',
  styleUrls: ['./chart2.component.css']
})
export class Chart2Component implements OnInit {

  public chart: any;
  constructor(private srv:RestService) { }
  mytable:any
  ngOnInit(): void {
    this.srv.getByYears().subscribe(
      (succes)=>{
      this.mytable=succes
      console.log(this.mytable)
      this.createChart();
      },
      (err)=>{console.log(err)}
      ) 
   
   

  }
  createChart() {
    let lables:any=[]
    let data:any=[]
    let colors:any=[]
    for (let index = 0; index < this.mytable.length; index++) {
      const element = this.mytable[index];
      if(element["name"]!=""){
        lables.push(element["name"])
        data.push(element["value"])
        colors.push('#'+Math.floor(Math.random()*16777215).toString(16))
      }

    }
    this.chart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: lables, 
	       datasets: [
          {
            label: "Nombre Article Par année",
            data: data,
            backgroundColor:colors
            
          }  
        ]
      },
      options: {
        aspectRatio:2.5
      }
      
    });
  }

}
