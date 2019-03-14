import {AfterViewInit, Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import {PostifyService} from '../../Services/postify.service';
import {ActivatedRoute} from '@angular/router';

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-weather-map',
  templateUrl: './weather-map.component.html',
  styleUrls: ['./weather-map.component.css']
})
export class WeatherMapComponent implements AfterViewInit, OnDestroy {
  private chart: am4charts.Chart;

  private data;

  constructor(private zone: NgZone, private postify: PostifyService, private actr: ActivatedRoute) {}


  private gettt(temperature): string {
    const weathers = [
      'rainy-1.svg',
      'cloudy.svg',
      'thunder.svg',
      'day.svg'
    ];

    if(temperature > 27) {
      return weathers[2];
    } else if (temperature > 20) {
      return weathers[3];
    } else if (temperature > 15) {
      return weathers[1];
    } else {
      return weathers[0];
    }
  }

  ngAfterViewInit() {
    this.actr.data.subscribe(data => this.data = data.cres.body.data);

    const self = this;

    // Create map instance
    const chart = am4core.create('chartdiv', am4maps.MapChart);

    chart.geodataSource.url = 'assets/poland.json';

    chart.projection = new am4maps.projections.Mercator();

    chart.homeZoomLevel = 1;
    chart.maxZoomLevel = 1;
    chart.seriesContainer.draggable = false;
    chart.seriesContainer.resizable = false;

    const polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.useGeodata = true;
    polygonSeries.nonScalingStroke = true;
    polygonSeries.strokeOpacity = 0.5;

    const imageSeries = chart.series.push(new am4maps.MapImageSeries());
    const imageTemplate = imageSeries.mapImages.template;
    imageTemplate.propertyFields.longitude = 'longitude';
    imageTemplate.propertyFields.latitude = 'latitude';
    imageTemplate.nonScaling = true;

    const image = imageTemplate.createChild(am4core.Image);
    image.propertyFields.href = 'imageURL';
    image.width = 50;
    image.height = 50;
    image.horizontalCenter = 'middle';
    image.verticalCenter = 'middle';

    const label = imageTemplate.createChild(am4core.Label);
    label.text = '{label}';
    label.horizontalCenter = 'middle';
    label.verticalCenter = 'top';
    label.dy = 20;

    const baseUrl = 'https://www.amcharts.com/lib/images/weather/animated/';

    this.data.forEach(function(data) {
      imageSeries.addData({
        latitude: data.latitude,
        longitude: data.longitude,
        imageURL: baseUrl + self.gettt(data.temperature),
        width: 32,
        height: 32,
        label: data.temperature + '\u2103'
      });
    });
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }
}
