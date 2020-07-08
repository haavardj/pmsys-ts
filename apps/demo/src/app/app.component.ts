import {Component, OnInit} from '@angular/core';
import {
  DateTimeFrame, DurationUnitValue,
  EndDateTimeInterval,
  IDataPoint,
  ISessionRPE,
  IWellness,
  PMSYS_2_0_PROVENANCE,
  WELLNESS_1_1_SCHEMA
} from 'pmsys';
import {SESSION_RPE_1_0_SCHEMA} from '../../../../libs/pmsys/src/corpore';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';

  wellness: IDataPoint<IWellness>;
  rpe: IDataPoint<ISessionRPE>;

  ngOnInit() {
    const now = new Date().toISOString();

    this.wellness = {
      header: {
        user_id: 'testuser',
        id: '1',
        modified_date_time: now,
        creation_date_time: now,
        effective_date_time: now,
        acquisition_provenance: PMSYS_2_0_PROVENANCE,
        schema_id: WELLNESS_1_1_SCHEMA
      },
      body: {
        effective_time_frame: new DateTimeFrame(now),
        readiness: 0,
        fatigue: 0,
        sleep: {duration: new DurationUnitValue(0, 'min'), quality: 3},
        soreness: 0,
        soreness_area: [],
        stress: 0,
        mood: 0,
      }
    }

    this.rpe = {
      header: {
        user_id: 'testuser',
        id: '2',
        modified_date_time: now,
        creation_date_time: now,
        effective_date_time: now,
        acquisition_provenance: PMSYS_2_0_PROVENANCE,
        schema_id: SESSION_RPE_1_0_SCHEMA
      },
      body: {
        activity_names: ['test'],
        time_interval: new EndDateTimeInterval(now, new DurationUnitValue(5, 'min')),
        perceived_exertion: 1,
      }
    }
  }
}
