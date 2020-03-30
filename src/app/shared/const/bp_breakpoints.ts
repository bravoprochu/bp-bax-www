import { Breakpoints } from '@angular/cdk/layout';


export function bp_braakpointsAll(): string[] {
    return [
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Handset,
        Breakpoints.HandsetLandscape,
        Breakpoints.HandsetPortrait,
        Breakpoints.Medium,
        Breakpoints.Tablet,
        Breakpoints.TabletLandscape,
        Breakpoints.TabletPortrait,
        Breakpoints.Web,
        Breakpoints.WebLandscape,
        Breakpoints.WebPortrait,
        Breakpoints.Large,
        Breakpoints.XLarge,
        ]
}
export function bp_braakpointsLandscape(): string[] {
    return [
        Breakpoints.HandsetLandscape,
        Breakpoints.TabletLandscape,
        Breakpoints.WebLandscape
        ]
}

export function bp_braakpointsPortrait(): string[] {
    return [
        Breakpoints.HandsetPortrait,
        Breakpoints.TabletPortrait,
        Breakpoints.WebPortrait
        ]
}


export function bp_braakpointsSmall(): string[] {
    return [
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Handset,
        Breakpoints.HandsetLandscape,
        Breakpoints.HandsetPortrait,
        Breakpoints.Medium,
        Breakpoints.Tablet,
        Breakpoints.TabletLandscape,
        Breakpoints.TabletPortrait,
        ]
}