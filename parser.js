export default class Parser {
  // Force input type to be a string
  static #forceToString( input ) {
    return new String( input || "" ).toString();
  }

  // Parse IRC message string into an object
  static parse( input ) {
    input = this.#forceToString( input || "" );
    let msg = new RegExp( /^(?:(?<tags>\@\S+)\s+)?(?:(?<prefix>\:\S+)\s+)?(?:(?<command>\S+)\s+)(?<params>.+)(?:(?:\\r)?\\n)?$/igm ).exec( input );
    msg = msg?.groups;
    return {
      "tags" : this.tags( msg?.tags ),
      "prefix" : this.prefix( msg?.prefix ),
      "command" : this.command( msg?.command ),
      "params" : this.params( msg?.params )
    };
  }

  // Parse IRC command
  static command( input ) {
    input = this.#forceToString( input || "" );
    return !input.includes( " " ) ? input.toUpperCase() : "";
  }

  // Parse IRC params
  static params( input ) {
    input = this.#forceToString( input || "" );
    if ( !input ) return [];
    const crlf = "\r\n";
    if ( input.includes( crlf ) ) input = input.replace( crlf , "" );
    let colon = ":";
    if ( input.startsWith( colon ) ) input = input.substring( 1 , input.length );
    colon = " :";
    const delimiter = input.indexOf( colon );
    const leading = input.includes( colon ) ? input.substring( 0 , delimiter ) : input;
    const trailing = input.includes( colon ) ? input.substring( delimiter + colon.length , input.length ) : "";
    return leading.split( " " ).concat( trailing ).filter( p => p );
  }

  // Parse IRC prefix
  static prefix( input ) {
    input = this.#forceToString( input || "" );
    if ( !input ) return {};
    let prefix = new RegExp( /^\:?(?:(?<nick>.+?)\!)?(?:(?<user>.+?)\@)?(?<host>.+)$/i ).exec( input );
    prefix = prefix?.groups;
    if ( !prefix ) return {};
    if ( !prefix?.nick ) delete prefix.nick;
    if ( !prefix?.user ) delete prefix.user;
    if ( !prefix?.host ) delete prefix.host;
    return prefix;
  }

  // Parse IRC tags
  static tags( input ) {
    input = this.#forceToString( input || "" );
    if ( !input ) return {};
    const at = "@";
    input = input.startsWith( at ) ? input.replace( at , "" ) : input;
    const tags = {};
    input.split( ";" ).forEach( tag => {
      tag = new RegExp( /(?<key>.+)\=(?<value>.+)/i ).exec( tag );
      tag = tag?.groups;
      if ( !tag ) return;
      tags[ tag.key ] = tag.value;
    } );
    return tags;
  }
}