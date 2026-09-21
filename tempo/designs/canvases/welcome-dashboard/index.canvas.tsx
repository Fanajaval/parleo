import { Canvas, Storyboard } from "tempo-sdk/canvas";
import { WelcomeDashboard, ActivityDashboard, NarrowDashboard } from "../../../../frontend/src/WelcomeDashboard.tsx";

export default function WelcomeDashboardCanvas() {
  return (
    <Canvas name="Welcome Dashboard">
      <Storyboard
        id="FirstRunDashboard"
        name="First run · desktop"
        component={WelcomeDashboard}
        layout={{ x: 0, y: 0, width: 1280, height: 860, intrinsicSizing: "root-element" }}
      />
      <Storyboard
        id="ActivityDashboard"
        name="Recent activity · desktop"
        component={ActivityDashboard}
        layout={{ x: 1330, y: 0, width: 1280, height: 860, intrinsicSizing: "root-element" }}
      />
      <Storyboard
        id="NarrowDashboard"
        name="First run · narrow"
        component={NarrowDashboard}
        layout={{ x: 0, y: 910, width: 390, height: 844, intrinsicSizing: "root-element" }}
      />
    </Canvas>
  );
}
