import Formatter from "./formatter.js";
import Parser from "./parser.js";

export default class Message {
  constructor( msg ) {
    let message = {
      "tags" : {},
      "prefix" : {},
      "command" : "",
      "params" : []
    };
    
    // Check whether msg is an object, string or any other type and format/parse accordingly
    if ( typeof msg != "string" ) {
      message = Parser.parse( Formatter.format( msg ) );
    } else {
      message = Parser.parse( msg );
    }

    // Set tags, prefix, command and params
    this.tags = message.tags;
    this.prefix = message.prefix;
    this.command = message.command;
    this.params = message.params;
  }

  // Define tags, prefix, command and params
  tags;
  prefix;
  command;
  params;

  // Return formatted IRC message
  toString() {
    return Formatter.format( this );
  }
}