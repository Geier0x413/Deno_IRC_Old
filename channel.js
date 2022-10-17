export default class Channel {
  // Force input type to be a string
  static #forceToString( input ) {
    return new String( input || "" ).toString();
  }

  // Check if the channel name and prefix are formatted correctly
  static checkName( input ) {
    input = this.#forceToString( input );
    const prefixes = Array.from( this.prefixes );
    let channel = new RegExp( `^(?<prefix>[\\${ prefixes.join( "\\" ) }])?(?<name>[^\\s,\\,]+$)` , "i" ).exec( input );
    return channel?.groups || {};
  }

  // List of prefixes for a channel
  static prefixes = new Set( [ "&" , "#" , "+" , "!" ] );

  constructor( input ) {
    let channel = Channel.checkName( input );
    this.name = channel.name || "";
    this.prefix = channel.prefix || "";
  }

  // Return formatted version of the channel's name and prefix
  toString() {
    return `${ channel.prefix }${ channel.name }` || "";
  }
}