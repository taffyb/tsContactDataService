export class User {

   get guid(): string {
       return this._guid;
   }
   get name(): string {
       return this._name;
   }
   get type(): number {
       return this._type;
   }

   set name(value: string) {
       this._name = value;
   }
   set type(value: number) {
       this._type = value;
   }

   constructor() {}
   private _guid: string;
   private _name: string;
   private _type: number;

   public static fromJson(json: string): User {
       const u = JSON.parse(json);
       const user = new User();
       user._guid = u.guid;
       user.name = u.name;
       user.type = u.type;

       return user;
   }
}
