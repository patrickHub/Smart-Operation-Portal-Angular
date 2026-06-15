import { Routes } from "@angular/router";
import { WorkorderComponent } from "./workorder.component";
import { AssignmentComponent } from "./assignment/assignment.component";
import { ReportComponent } from "./report/report.component";
import { TaskComponent } from "./task/task.component";

export const WORKORDER_ROUTES: Routes = [
    {
        path: '',
        component: WorkorderComponent,
    },
    {
        path: 'assignments',
        component: AssignmentComponent,
    },
    {
        path: 'tasks',
        component: TaskComponent,
    },
    {
        path: 'reports',
        component: ReportComponent,
    }, 
];