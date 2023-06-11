
success_bit=true
success_threshold=70

for i in `seq 2 4`
do
  probability=`curl --silent -X POST -F image=@sample-numbers/$i.png http://localhost:8000/api/numeric-judge | jq ".\"$i\""`
  if test $probability -gt $success_threshold; then
    echo -e "\e[32mOK\e[m $i -> $probability%"
  else
    echo -e "\e[31mNG\e[m $i -> $probability%"
    success_bit=false
  fi
done

if $success_bit; then
  echo -e "\e[32m- SUCCESS!!!\e[m"
  exit 0
else
  echo -e "\e[31m- FAILED...\e[m"
  exit 1
fi
