HASHLINK_PATH=/Users/kuss/project/learn/hashlink/*.hdll

echo "Compiling to out/native/main.c..."
haxe build.native.hxml

echo "Compiling out/native/main.c to binary..."
arch -x86_64 gcc -O3 -o game -I out/native out/native/main.c -lhl ${HASHLINK_PATH}