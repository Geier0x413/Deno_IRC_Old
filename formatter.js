export default class Formatter {
  // Force input type to be a string
  static #forceToString( input ) {
    return new String( input || "" ).toString();
  }

  // Format IRC message object into a string
  static format( input ) {
    if ( !input || typeof input != "object" ) input = {};
    const msg = {
      "tags" : this.tags( input?.tags ),
      "prefix" : this.prefix( input?.prefix ),
      "command" : this.command( input?.command ),
      "params" : this.params( input?.params )
    }
    return `${ msg.tags ? `${ msg.tags } ` : "" }${ msg.prefix ? `${ msg.prefix } ` : "" }${ msg.command ? `${ msg.command } ` : "" }${ msg.params ? `${ msg.params }\r\n` : "" }`;
  }

  // Format IRC command
  static command( input ) {
    input = this.#forceToString( input || "" );
    return !input.includes( " " ) ? input.toUpperCase() : "";
  }

  // Format IRC params
  static params( input ) {
    if ( !input || !Array.isArray( input ) ) return "";
    let leading = [];
    let trailing = [];
    input.forEach( param => {
      param = this.#forceToString( param || "" );
      ( param.includes( " " ) ? trailing : leading ).push( param.replace( /^\:+/ , "" ) );
    } );
    leading = leading.join( " " );
    trailing = trailing.join( " :" );
    return `${ leading }${ trailing ? `${ leading ? " " : "" }:${ trailing }` : "" }`;
  }

  // Format IRC prefix
  static prefix( input ) {
    if ( !input || typeof input != "object" ) return "";
    let { nick , user , host } = input;
    nick = this.#forceToString( nick || "" );
    user = this.#forceToString( user || "" );
    host = this.#forceToString( host || "" );
    let prefix = "";
    if ( nick && user && host ) prefix += `${ nick }!`;
    if ( user && host ) prefix += `${ user }@`;
    if ( host ) prefix += `${ host }`;
    return prefix.length ? `:${ prefix }` : prefix;
  }

  // Format IRC tags
  static tags( input ) {
    if ( !input || typeof input != "object" ) return "";
    const tags = [];
    for ( let key in input ) {
      let value = this.#forceToString( input[ key ] || "" );
      tags.push( `${ key }=${ value }` );
    }
    return tags.length ? `@${ tags.join( ";" ) }` : "" ;
  }
}