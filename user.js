export default class User {
  // Force input type to be a string
  static #forceToString( input ) {
    return new String( input || "" ).toString();
  }

  // Check if the user's name and prefix are formatted correctly
  static checkName( input ) {
    input = this.#forceToString( input );
    const prefixes = Array.from( this.prefixes );
    let user = new RegExp( `^(?<prefix>[\\${ prefixes.join( "\\" ) }])?(?<name>\\S+)$` , "i" ).exec( input );
    return user?.groups || {};
  }

  // List of prefixes for a user
  static prefixes = new Set( [ "~" , "&" , "@" , "%" , "+" ] );

  constructor( input ) {
    let user = User.checkName( input );
    this.name = user.name || "";
    this.prefix = user.prefix || "";
  }

  // Return formatted version of the user's name and prefix
  toString() {
    return `${ user.prefix }${ user.name }` || "";
  }
}