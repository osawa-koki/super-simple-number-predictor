
for i in `seq 2 4`
do
  probability=`curl --silent -X POST -F image=@sample-numbers/$i.png http://localhost:8000/api/numeric-judge | jq ".\"$i\""`
  if test $probability -gt 70; then
    echo -e "\e[32mOK\e[m $i -> $probability%"
  else
    echo -e "\e[31mNG\e[m $i -> $probability%"
  fi
done
