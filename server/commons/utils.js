/**
 * Created by pankaj on 2/8/17.
 */
Number.prototype.round = function(p) {
  p = p || 10;
  return parseFloat( this.toFixed(p) );
};
