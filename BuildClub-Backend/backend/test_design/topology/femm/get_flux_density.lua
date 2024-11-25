path = "data/6719e3fee4a06f68d90b1170/car/car_Motor/flux_density_data.txt"
handle = openfile(path,"w")


num_ele = mo_numnodes()
for i=1, num_ele,1 do
      x,y =  mo_getnode(i)
      _,b1,b2 =  mo_getpointvalues(x,y)
     write(handle,x..","..y..","..b1..","..b2.."\n")
    end

     closefile(handle)
