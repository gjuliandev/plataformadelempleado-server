import mysql from "mysql";

class MySql {
  private static _instance: MySql;

  pool: mysql.Pool;
  conectado: boolean = false;

  constructor() {
    this.pool = mysql.createPool({
      host: "plataformadelempleado.es",
      user: "ptalempleado",
      password: "RmFmB91(#)23",
      database: "portaldelempleadoDB",
      multipleStatements: true,
    });

    // this.pool = mysql.createPool({
    //     host: 'plataformadelempleado.es',
    //     user: 'ptalempleado_BKP',
    //     password: 'K29ok7]9/4,3',
    //     database: 'portaldelempleadoDB_BKP',
    //     multipleStatements: true

    // });
  }

  public static get instance() {
    return this._instance || (this._instance = new this());
  }

  static async ejecutarQuery(query: string, params: any[], callback: Function) {
    this.instance.pool.getConnection((err: any, connection: any) => {
      if (err) {
        return callback(err);
      }

      this.instance.pool.query(query, params, (err, results, fields) => {
        if (err) {
          connection.release();
          return callback(err);
        }

        connection.release();
        callback(null, results, fields);
      });
    });
  }
}

export default MySql;
