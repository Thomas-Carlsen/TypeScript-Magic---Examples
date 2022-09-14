import { stringConstants } from "./string-values-as-keys";


// Hvad fanden har jeg lavet her??? Pick virker til at gøre præcist det samme
export type SelectedXrmQuery<Type, TypeList extends keyof Type> = { [P in keyof Pick<Type, TypeList>]-?: Exclude<Pick<Type, TypeList>[P], undefined> };

// Hvad os prøve at forstå:
// - TypeList extends keyof Type - TypeList skal være en del af keys'ene - tror jeg også Pick tjekker ?`
// - Pick<Type, TypeList> - burde jo så egentlig tage det man skal bruge 
// - P - er derfor et element i TypeList fordi det er in keyof af ovenfor - altså 'stringA' og 'stringB' nedenfor
// - Pick<Type, TypeList>[P] - er egentlig bare Type[P]
// - Exclude<Pick<Type, TypeList>[P], undefined> - since this is just Exclude<Type[P], undefined>, 
// it can at most exclude only one type i.e. Type[P] which is a very very stupid way to use Exclude. 
// So my guess is that it Exclude<Pick<Type, TypeList>[P], undefined> is never when Type[P] is undefined otherwise it is Type[P]-?
// and because of the never the other types doesn't show up later in the cases where the SelectedXrmQuery is used


// type TransactionalCA = SelectedXrmQuery<XDT.Incident_Base, 'title' | 'statuscode'> & XDT.Incident_Fixed;
// type ConfigurationTransactionalCA =
//     SelectedXrmQuery<XDT.dg_configuration_Result, 'dg_catransactionalsubject_guid' | 'dg_carequestformid'>
//     & XDT.dg_configuration_Fixed;


interface stringConstants {
  stringA: "a";
  stringB: "b";
  stringC: "c";
}

type tt = SelectedXrmQuery<stringConstants, 'stringA' | 'stringB'> // and they don't even look optional - nani? but a simple Partial would do the trick
type tt2 = Pick<stringConstants, 'stringA' | 'stringB'>

const ob = {} as tt;
const ob2 = {} as tt2;

ob.stringA

ob2.stringA;