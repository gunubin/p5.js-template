

export const clamp = (x, lowerlimit, upperlimit) => {
  if (x < lowerlimit)
    x = lowerlimit;
  if (x > upperlimit)
    x = upperlimit;
  return x;
}

export const linearstep = (edge0, edge1, x) => {
  // linearstep (not a builtin function)
  const t = (x - edge0) / (edge1 - edge0);
  // when p.y == edge0 => t = 0.0
  // when p.y == edge1 => t = 1.0
  // RHS is a linear function of y
  // so, between edge0 and edge1, t has a linear transition
  // between 0.0 and 1.0
  // return t
  return clamp(t, 0, 1);
  // t will have negative values when t<edge0 and
  // t will have greater than 1.0 values when t>edge1
  // but we want it be constraint between 0.0 and 1.0
  // so, clamp it!
//        return t;
}


