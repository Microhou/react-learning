// type UnArray<T> = T extends any[] ? T[number] : T

type UnArray<T> = T extends Array<infer U> ? U : T

type Users = {
    name: string,
    age: number,
    city: string
}[]
type User = UnArray<Users>
type Str = UnArray<string>

type Arr = ['a', 'b', 'c']
type First<T extends any[]> = T extends  [infer First, ...any[]]? First : [];

type a = First<Arr>